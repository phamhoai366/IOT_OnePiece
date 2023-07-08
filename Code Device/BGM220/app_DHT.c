/***************************************************************************//**
 * @file
 * @brief Top level application functions
 *******************************************************************************
 * # License
 * <b>Copyright 2020 Silicon Laboratories Inc. www.silabs.com</b>
 *******************************************************************************
 *
 * The licensor of this software is Silicon Laboratories Inc. Your use of this
 * software is governed by the terms of Silicon Labs Master Software License
 * Agreement (MSLA) available at
 * www.silabs.com/about-us/legal/master-software-license-agreement. This
 * software is distributed to you in Source Code format and is governed by the
 * sections of the MSLA applicable to Source Code.
 *
 ******************************************************************************/

#include <stdio.h>
#include "em_device.h"
#include "em_chip.h"
#include "em_cmu.h"
#include "em_timer.h"
#include "em_gpio.h"
#include "app_log.h"

//#include "sl_sleeptimer.h"
#include "app.h"
#include "sl_udelay.h"
#include "sl_status.h"
#include "string.h"

#define GPIO_DHT11PORT                  gpioPortC
#define GPIO_DHT11PIN                   1
#define GPIO_DHT11PIN_INPUTMODE         gpioModeInputPullFilter
#define GPIO_DHT11PIN_OUTPUTMODE        gpioModePushPull

#define GPIO_DHT11PIN_LOW            0
#define GPIO_DHT11PIN_HIGH           1
#define TIMEOUT UINT32_MAX

const float NAN = -99.0;
sl_status_t status;
static uint32_t maxcycles;
bool lastresult;
uint8_t data[5];

static uint32_t expectPulse(bool level);
static bool dht11_read();
static int16_t CalcTemperature();
static int16_t CalcHumidity();
sl_status_t dht11_getRHTdata();
void dht11_init();

void app_init(void)
{
   dht11_init();
   app_log("start!!");
}

/***************************************************************************//**
 * App ticking function.
 ******************************************************************************/
void app_process_action(void)
{
  if (dht11_getRHTdata() == SL_STATUS_OK)
    {
      int16_t temperature = CalcTemperature();
      int16_t humidity = CalcHumidity();

      // Print data from sensor to console
      app_log("temperature: %d\n", temperature);
      app_log("Humidity: %d %%\n", humidity);
    }
}


static uint32_t expectPulse(bool level)
{
  uint32_t count = 0;

  // TODO: Look into using DMA functionality here
  while ( GPIO_PinInGet(GPIO_DHT11PORT, GPIO_DHT11PIN) == level) {
    if (count++ >= maxcycles) {
      return TIMEOUT; // Exceeded timeout, fail.
    }
  }
  return count;
}


static bool dht11_read()
{
  memset(data, 0, 5);
  // Send start signal.  See DHT datasheet for full signal diagram:
  //   http://www.adafruit.com/datasheets/Digital%20humidity%20and%20temperature%20sensor%20AM2302.pdf

  // Go into high impedance state to let pull-up raise data line level and start the reading process.
  GPIO_PinModeSet(GPIO_DHT11PORT,
                  GPIO_DHT11PIN,
                  GPIO_DHT11PIN_INPUTMODE,
                  GPIO_DHT11PIN_HIGH);

  sl_udelay_wait(1100);

  // First set data line low for a period according to sensor type
  GPIO_PinModeSet(GPIO_DHT11PORT,
                  GPIO_DHT11PIN,
                  GPIO_DHT11PIN_OUTPUTMODE,
                  GPIO_DHT11PIN_LOW);


  GPIO_PinOutClear(GPIO_DHT11PORT, GPIO_DHT11PIN);

  sl_udelay_wait(1100);         // data sheet says "at least 1ms"

  GPIO_PinOutSet(GPIO_DHT11PORT, GPIO_DHT11PIN);

  // Go into high impedance state to let pull-up raise data line level and start the reading process.
  GPIO_PinModeSet(GPIO_DHT11PORT,
                  GPIO_DHT11PIN,
                  GPIO_DHT11PIN_INPUTMODE,
                  GPIO_DHT11PIN_HIGH);

  sl_udelay_wait(50);

  uint32_t cycles[80];

  // We now enter a critical timing phase -------------------------------------
  // ==========================================================================
  CORE_DECLARE_IRQ_STATE;
  CORE_ENTER_ATOMIC();

  // First expect a low signal for ~80 microseconds followed by a high signal
  // for ~80 microseconds again.
  if (expectPulse(0) == TIMEOUT) {
    lastresult = false;
    return lastresult;
  }
  if (expectPulse(1) == TIMEOUT) {
    lastresult = false;
    return lastresult;
  }
  // Now read the 40 bits sent by the sensor.  Each bit is sent as a 50
  // microsecond low pulse followed by a variable length high pulse.  If the
  // high pulse is ~28 microseconds then it's a 0 and if it's ~70 microseconds
  // then it's a 1.  We measure the cycle count of the initial 50us low pulse
  // and use that to compare to the cycle count of the high pulse to determine
  // if the bit is a 0 (high state cycle count < low state cycle count), or a
  // 1 (high state cycle count > low state cycle count). Note that for speed
  // all the pulses are read into a array and then examined in a later step.
  for (int i = 0; i < 80; i += 2) {
    cycles[i] = expectPulse(0);
    cycles[i + 1] = expectPulse(1);
  }

  // We now leave a critical timing phase -------------------------------------
  // ==========================================================================
  CORE_EXIT_ATOMIC();

  // Inspect pulses and determine which ones are 0 (high state cycle count < low
  // state cycle count), or 1 (high state cycle count > low state cycle count).
  for (int i = 0; i < 40; ++i) {
    uint32_t lowCycles = cycles[2 * i];
    uint32_t highCycles = cycles[2 * i + 1];
    if ((lowCycles == TIMEOUT) || (highCycles == TIMEOUT)) {
      lastresult = false;
      return lastresult;
    }
    data[i / 8] <<= 1;
    // Now compare the low and high cycle times to see if the bit is a 0 or 1.
    if (highCycles > lowCycles) {
      // High cycles are greater than 50us low cycle count, must be a 1.
      data[i / 8] |= 1;
    }
    // Else high cycles are less than (or equal to, a weird case) the 50us low
    // cycle count so this must be a zero.  Nothing needs to be changed in the
    // stored data.
  }

  // Check we read 40 bits and that the checksum matches.
  if (data[4] == ((data[0] + data[1] + data[2] + data[3]) & 0xFF)) {
    lastresult = true;
    return lastresult;
  } else {
    lastresult = false;
    return lastresult;
  }

}

static int16_t CalcTemperature()
{
  int16_t fTemp = NAN;
  fTemp = ((int16_t)(data[2] & 0x7F)) << 8 | data[3];
  if (data[2] & 0x80) {
      fTemp *= -1;
  }
//  app_log_info("Absolute Temperature %d \n", fTemp);
  return fTemp;
}

static int16_t CalcHumidity()
{
  int16_t fHumidity = NAN;
  fHumidity = ((int16_t)data[0]) << 8 | data[1];
//  app_log_info("Absolute Humidity %d \n", fHumidity);

  return fHumidity;
}

sl_status_t dht11_getRHTdata(int16_t* TEMP, int16_t* RH)
{
  if (dht11_read()) {
      // Use the data received
      *TEMP = CalcTemperature();
      *RH = CalcHumidity();
      app_log("OKOKNHA");
      return SL_STATUS_OK;
  }
  else {
  app_log("Fail\n");
  return SL_STATUS_FAIL;
  }
}

//
void dht11_init(void)
{
  CMU_ClockEnable(cmuClock_GPIO, true);
  GPIO_PinModeSet(GPIO_DHT11PORT,
                  GPIO_DHT11PIN,
                  GPIO_DHT11PIN_INPUTMODE,
                  GPIO_DHT11PIN_HIGH);

  // First we set out max cycles to represent a 1ms timeout
  maxcycles = SystemCoreClockGet() / 1000U;

}
