/***************************************************************************/ /**
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

/***************************************************************************/ /**
                                                                               * Initialize application.
                                                                               ******************************************************************************/
#include "em_device.h"
#include "em_chip.h"
#include "em_cmu.h"
#include "em_gpio.h"
#include "em_emu.h"
#include "em_timer.h"
#include <unistd.h>

void app_init(void)
{
#define LED_PORT gpioPortA
#define LED_PIN 4
}

/***************************************************************************/ /**
                                                                               * App ticking function.
                                                                               ******************************************************************************/
void app_process_action(void)
{
    // Khởi tạo hệ thống
    CHIP_Init();

    CMU_ClockEnable(cmuClock_GPIO, true);
    GPIO_PinModeSet(LED_PORT, LED_PIN, gpioModePushPull, 0);

    while (1)
    {
        // Bật đèn LED
        GPIO_PinOutSet(LED_PORT, LED_PIN);
        sleep(5);
        // Tắt đèn LED
        GPIO_PinOutClear(LED_PORT, LED_PIN);
        sleep(5);
        
    }
}
