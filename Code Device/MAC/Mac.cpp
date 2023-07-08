#include <Arduino.h>
#include <ESP8266WiFi.h>

void setup()
{
  Serial.begin(115200);

  // Kết nối tới WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin("Duyen Hai", "duyen04091977");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(5000);
    Serial.println("Connecting to WiFi...");
  }
}

void loop() {
  // Lấy địa chỉ MAC
  uint8_t mac[6];
  WiFi.macAddress(mac);

  // In địa chỉ MAC
  Serial.printf("MAC Address: %02x:%02x:%02x:%02x:%02x:%02x\n",
                mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);}