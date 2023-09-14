#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiManager.h>
#include <HTTPClient.h>
#include <ESP32httpUpdate.h>

const char* currentVersion = "1.0";
const char* serverUrl = "http://192.168.1.35:3000/room1/firmware.bin";

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.println();
  
  // Connect Wifi
  WiFiManager wm;
  bool res;
  res = wm.autoConnect("AutoConnectAP","password");
  if(!res) {
      Serial.println("Failed to connect");
  } 
  else { 
      Serial.println("connected...yeey :)");
  }

  // httpUpdate
  Serial.print("ESP32 http update, current version: ");
  Serial.println(currentVersion);

  t_httpUpdate_return ret = ESPhttpUpdate.update(serverUrl, currentVersion);

  switch(ret) {
    case HTTP_UPDATE_FAILED:
      Serial.printf("HTTP_UPDATE_FAILD Error (%d): %s", ESPhttpUpdate.getLastError(), ESPhttpUpdate.getLastErrorString().c_str());
      break;

    case HTTP_UPDATE_NO_UPDATES:
      Serial.println("HTTP_UPDATE_NO_UPDATES");
      break;
    case HTTP_UPDATE_OK:
      Serial.println("HTTP_UPDATE_OK");
      break;
  }
}

void loop() {
}
