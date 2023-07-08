#include<Arduino.h>
#include<WiFiClient.h>
#include<WiFi.h>
#include<WiFiManager.h>
#include<WebServer.h>
#include<DHT.h>
#include<DHT_U.h>
#include<Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert Firebase project API Key
#define API_KEY "AIzaSyBXlZCXmmROshPQPnHl54aS9cOkkvyfIAQ"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "esp32-firebase-51af7-default-rtdb.asia-southeast1.firebasedatabase.app" 

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

int DHTPIN = 17;
int DHTTYPE = DHT11;

DHT dht(DHTPIN, DHTTYPE);

int voicePin = 35;

void voiceSensor(){
  int val = digitalRead(voicePin);
}

void tempSensor(){
  float t = dht.readTemperature(); //Đọc nhiệt độ
}

void humiSensor(){
  float h = dht.readHumidity();    //Đọc độ ẩm
}

void setup()
{
  pinMode(voicePin,INPUT);
  Serial.begin(115200);
  dht.begin();
  
  //connect wifi
  WiFiManager wm;
  //wm.resetSettings();
  bool res;
  res = wm.autoConnect("AutoConnectAP","password");
  if(!res) {
    Serial.println("Failed to connect");
    // ESP.restart();
  } 
  else {   
      Serial.println("Wifi connected...yeey :)");
  }

  //Firebase
   /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop()
{
  float t = dht.readTemperature(); //Đọc nhiệt độ
  float h = dht.readHumidity();    //Đọc độ ẩm
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();

    if (Firebase.RTDB.setFloat(&fbdo, "test/temp", t)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    
    if (Firebase.RTDB.setFloat(&fbdo, "test/humi", h)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
}