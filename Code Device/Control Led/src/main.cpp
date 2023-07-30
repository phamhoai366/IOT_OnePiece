#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>


// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Duyen Hai"
#define WIFI_PASSWORD "duyen04091977"

// Insert Firebase project API Key
#define API_KEY "AIzaSyC40WQVUyQkOLLAOq8RNXG8Uu_6Wh6Ihrk"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://iotchallenge-7715c-default-rtdb.firebaseio.com/"
#define USER_EMAIL "hieudaihiep@gmail.com"
#define USER_PASSWORD "123456789"

// Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String uid;

unsigned long sendDataPrevMillis = 0;
int intValue;
float floatValue;
bool signupOK = false;

void setup()
{
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;
  //config.token_status_callback = tokenStatusCallback;
  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("ok");
    signupOK = true;
  }
  else
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  pinMode(2, OUTPUT);
}

void loop()
{

  if (Firebase.RTDB.getInt(&fbdo, "/Nha_A/Room1/Led"))
  {
    intValue = fbdo.intData();
    Serial.println(intValue);
     analogWrite(2, intValue);  
  }
  delay(500);
}

