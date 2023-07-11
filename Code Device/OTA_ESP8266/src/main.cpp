#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include "DHT.h"
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include "WiFiManager.h" //https://github.com/tzapu/WiFiManager

#define DHTPIN 14 // Pin D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define GasPin A0
#define Motion B00000000

#define FIREBASE_HOST "iotchallenge-7715c-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "IhIsDB8pJ8GK7jqtkF8e4EPHrH2RUjj7ZJ1NAO58"
FirebaseData firebaseData;

float h, hO = 0;
float t, tO = 0;
float hic;
int gasSensorAnalog, gasSensorAnalog0 = 0;
int isMotion;
unsigned long timer = millis();

void setDataMyHome(float h, float t, float hic, int gas, int motion)
{
  if (Firebase.setFloat(firebaseData, "/Humidity", h))
  {
    Serial.println("PASSED Humidity");
    Serial.print("VALUE: ");
    Serial.print(firebaseData.floatData());
    Serial.println("------------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }

  if (Firebase.setFloat(firebaseData, "/Temperature", t))
  {
    Serial.println("PASSED Temperature");
    Serial.print("VALUE: ");
    Serial.print(firebaseData.floatData());
    Serial.println("------------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }

  if (Firebase.setFloat(firebaseData, "/HeatIndex", hic))
  {
    Serial.println("PASSED HeatIndex");
    Serial.print("VALUE: ");
    Serial.print(firebaseData.floatData());
    Serial.println("------------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }

  if (Firebase.setFloat(firebaseData, "/Gas", gas))
  {
    Serial.println("PASSED Gas");
    Serial.print("VALUE: ");
    Serial.print(firebaseData.floatData());
    Serial.println("------------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }

  if (Firebase.setFloat(firebaseData, "/Motion", motion))
  {
    Serial.println("PASSED Motion");
    Serial.print("VALUE: ");
    Serial.print(firebaseData.floatData());
    Serial.println("------------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }
}

void configModeCallback(WiFiManager *myWiFiManager)
{
  Serial.println("Entered config mode");
  Serial.println(WiFi.softAPIP());
  Serial.println(myWiFiManager->getConfigPortalSSID());
}

void setup()
{
  pinMode(GasPin, INPUT);
  pinMode(Motion, INPUT);

  Serial.begin(9600);
  WiFiManager wifiManager;
  // có thểreset các cài đặt cũ bằng cách gọi hàm:
  //  wifiManager.resetSettings();

  wifiManager.setAPCallback(configModeCallback);
  if (!wifiManager.autoConnect())
  {
    Serial.println("failed to connect and hit timeout");
    ESP.reset();
    delay(1000);
  }
  Serial.println("connected...yeey :)");

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  firebaseData.setBSSLBufferSize(1024, 1024);
  firebaseData.setResponseSize(1024);
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  Serial.println("Start DHT11");
  dht.begin();
}

void loop()
{
  if ((unsigned long)(millis() - timer) > 1000)
  {
    h = dht.readHumidity();
    t = dht.readTemperature();
    hic = dht.computeHeatIndex(t, h, false);

    gasSensorAnalog = analogRead(GasPin);

    isMotion = digitalRead(Motion);

    if (isnan(h) || isnan(t))
    {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }
  }

  // đẩy giá trị lên firebase
  if (abs(t - tO) > 0.1 || abs(h - hO) > 0.5 || abs(gasSensorAnalog - gasSensorAnalog0) > 1)
  {
    setDataMyHome(h, t, hic, gasSensorAnalog, isMotion);
    hO = h;
    tO = t;
    gasSensorAnalog0 = gasSensorAnalog;
  }
}
