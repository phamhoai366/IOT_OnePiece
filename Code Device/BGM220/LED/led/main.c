#include "em_device.h"
#include "em_chip.h"
#include "em_cmu.h"
#include "em_gpio.h"

#define LED_PORT  gpioPortA
#define LED_PIN   4

int main(void)
{
  // Khởi tạo hệ thống
  CHIP_Init();

  // Khởi tạo sự cần thiết cho LED
  CMU_ClockEnable(cmuClock_GPIO, true);
  GPIO_PinModeSet(LED_PORT, LED_PIN, gpioModePushPull, 0);

  while (1)
  {
    // Bật đèn LED
    GPIO_PinOutSet(LED_PORT, LED_PIN);


  }
}
