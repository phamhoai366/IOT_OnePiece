// MACt: bc:dd:c2:80:fe:3f
// MACn: 48:55:19:e4:8b:27

//Kitchen ... room1

// Include Libraries
#ifdef ESP32
  #include <WiFi.h>
#else
  #include <ESP8266WiFi.h>
#endif

#include <espnow.h>
#include "DHT.h"
#include "FirebaseESP8266.h"
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include "WiFiManager.h"  


#define USER_EMAIL "abc@gmail.com"
#define USER_PASSWORD "111111"

#define FIREBASE_HOST "iotchallenge-7715c-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "IhIsDB8pJ8GK7jqtkF8e4EPHrH2RUjj7ZJ1NAO58"
FirebaseData firebaseData;
FirebaseAuth auth;

#define ledR D1
#define ledY D2
#define GasPin A0   
#define DHTPIN D5   // Pin D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Define variables to store DHT readings to be sent
float temperature;
float humidity;
int gasSensorAnalog;
int isMotion;

// Define variables to store incoming readings
float incomingTemp;
float incomingHum;
int incomingMotion;

// Variable to store if sending data was successful
String success;

int status;
int status2;
int status3;
int statusLedY2;
int statusDoor;

// REPLACE WITH RECEIVER MAC Address
uint8_t broadcastAddress[] = {0x48, 0x55, 0x19, 0xe4, 0x8b, 0x27};    // 8266 n
uint8_t broadcastAddress_1[] = {0xbc, 0xdd, 0xc2, 0x80, 0xfe, 0x3f};   //8266 to
uint8_t broadcastAddress_2[] = {0x80, 0x7D, 0x3A, 0xB9, 0x16, 0x14};      //32

// Structure to send data Must match the receiver structure
typedef struct struct_message {
  float temp;
  float hum;
  int gas;
  int motion;
  int led2;
  int led3;
  int door3;
} struct_message;

// Create a struct_message called myData
struct_message myData;

// Create a struct_message to hold incoming sensor readings
struct_message incomingReadings;


const int MAX_DEVICES = 3; // Số lượng thiết bị (ví dụ: 3 thiết bị)
struct struct_message devicesData[MAX_DEVICES];

unsigned long lastTime = 0;  
unsigned long timerDelay = 2000;  // send readings timer

void configModeCallback (WiFiManager *myWiFiManager)
{
  Serial.println("Entered config mode");
  Serial.println(WiFi.softAPIP());
  Serial.println(myWiFiManager->getConfigPortalSSID());
}

// Callback when data is sent
void OnDataSent(uint8_t *mac_addr, uint8_t sendStatus) {
  Serial.println("Last Packet Send Status: ");
  if (sendStatus == 0){
    Serial.println("Delivery success");
  }
  else{
    Serial.println("Delivery fail");
  }
}

// Callback when data is received
void OnDataRecv(uint8_t * mac, uint8_t *incomingData, uint8_t len) {
  // memcpy(&incomingReadings, incomingData, sizeof(incomingReadings));
  // Serial.print("Bytes received: ");
  // Serial.println(len);
  // incomingTemp = incomingReadings.temp;
  // incomingHum = incomingReadings.hum;
  // incomingMotion = incomingReadings.motion;

  if (len != sizeof(struct_message)) {
    Serial.println("Invalid data length");
    return;
  }
  
  struct_message receivedData;
  memcpy(&receivedData, incomingData, sizeof(receivedData));

  // Kiểm tra địa chỉ MAC của thiết bị gửi dữ liệu
  // và lưu trữ dữ liệu tương ứng vào mảng devicesData
  if (memcmp(mac, broadcastAddress, sizeof(broadcastAddress)) == 0) {
    devicesData[0] = receivedData; // Thiết bị đầu tiên
  } else if (memcmp(mac, broadcastAddress_1, sizeof(broadcastAddress_1)) == 0) {
    devicesData[1] = receivedData; // Thiết bị thứ hai
  } else if (memcmp(mac, broadcastAddress_2, sizeof(broadcastAddress_2)) == 0) {
    devicesData[2] = receivedData; // Thiết bị thứ ba
  }
  // Hiển thị thông tin về dữ liệu nhận được từ tất cả các thiết bị
  Serial.println("INCOMING READINGS");
  for (int i = 0; i < MAX_DEVICES; i++) {
    Serial.print("Device ");
    Serial.println(i+1);
    Serial.print("temp: ");
    Serial.println(devicesData[i].temp);
    Serial.print("humidity: ");
    Serial.println(devicesData[i].hum);
    Serial.print("gas: ");
    Serial.println(devicesData[i].gas);
    Serial.print("motion: ");
    Serial.println(devicesData[i].motion);
    Serial.print("led: ");
    Serial.println(devicesData[i].led2);
  }
}

void getReadDht(){
  temperature = dht.readTemperature();
  if (isnan(temperature)){
    Serial.println("Failed to read temperature from dht");
    temperature = 0.0;
  }

  humidity = dht.readHumidity();
  if (isnan(humidity)){
    Serial.println("Failed to read humidity from DHT");
    humidity = 0.0;
  }
}

void printIncomingReadings(){
  // Display Readings in Serial Monitor
  Serial.println("INCOMING READINGS");
  Serial.print("Temperature: ");
  Serial.print(incomingTemp);
  Serial.println(" ºC");
  Serial.print("Humidity: ");
  Serial.print(incomingHum);
  Serial.println(" %");
  Serial.print("Motion: ");
  Serial.println(incomingMotion);
}

void controlLed(int ledn){
  status = firebaseData.intData();
  analogWrite(ledn, 255 - status);
}

int getLedDataFirebase(){
    statusLedY2 = firebaseData.intData();
    Serial.print("LedY: ");
    Serial.println(statusLedY2);
    return statusLedY2;
}

int getDoorDataFirebase(){
    status = firebaseData.intData();
    Serial.print("Door: ");
    Serial.println(status);
    return status;
}

void setup() {
  // Init Serial Monitor
  Serial.begin(115200);

  // Init DHT sensor
  dht.begin();

  pinMode(GasPin, INPUT); 
  analogWrite(ledY, 512);
  analogWrite(ledR, 0); 

  WiFiManager wifiManager;
  Serial.print("Connecting to Wifi... ");

  wifiManager.setAPCallback(configModeCallback);
  if (!wifiManager.autoConnect())
  {
    Serial.println("failed to connect and hit timeout");
    ESP.reset();
    delay(1000);
  }
  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Serial.println("connected...yeey :)");
  Serial.println("Wifi ssid: ");
  Serial.println(wifiManager.getWiFiSSID());
  Serial.println("Wifi pass: ");
  Serial.println(wifiManager.getWiFiPass());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  firebaseData.setBSSLBufferSize(1024, 1024);
  firebaseData.setResponseSize(1024);
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  Firebase.setInt(firebaseData, "Nha_A/Room1/Led", 0);
  Firebase.setInt(firebaseData, "Nha_A/Room2/Led", 0);
  Firebase.setInt(firebaseData, "Nha_A/Room3/Led", 0);

  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != 0) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Once ESPNow is successfully Init, we will register for Send CB to
  // get the status of Trasnmitted packet
  // esp_now_set_self_role(ESP_NOW_ROLE_CONTROLLER);
  esp_now_set_self_role(ESP_NOW_ROLE_COMBO);

  esp_now_register_send_cb(OnDataSent);
  
  // Register peer
  esp_now_add_peer(broadcastAddress, ESP_NOW_ROLE_COMBO, 1, NULL, 0);
  esp_now_add_peer(broadcastAddress_1, ESP_NOW_ROLE_COMBO, 1, NULL, 0);
  esp_now_add_peer(broadcastAddress_2, ESP_NOW_ROLE_COMBO, 1, NULL, 0);


  esp_now_register_recv_cb(OnDataRecv);
}
 
void loop() {
  if ((millis() - lastTime) > timerDelay) {
    
    // Set values to send
    getReadDht();
    gasSensorAnalog = analogRead(GasPin);
    if (Firebase.getInt(firebaseData, "Nha_A/Room2/Led")){
      status2 = getLedDataFirebase();
    }

    if (Firebase.getInt(firebaseData, "Nha_A/Room3/Led")){
      status3 = getLedDataFirebase();
    }

    if (Firebase.getInt(firebaseData, "Nha_A/Room3/Door")){
      statusDoor = getDoorDataFirebase();
    }

    //set values to send
    myData.temp = temperature;
    myData.hum = humidity;
    myData.gas = gasSensorAnalog;
    myData.motion = isMotion;
    myData.led2 = status2;
    myData.led3 = status3;
    myData.door3 = statusDoor;

    Firebase.setFloat(firebaseData, "Nha_A/Room1/Temperature", myData.temp);
    Firebase.setFloat(firebaseData, "Nha_A/Room1/Humidity", myData.hum);
    Firebase.setInt(firebaseData, "Nha_A/Room1/Gas", myData.gas);

    // Send message via ESP-NOW
    // esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
        // Send message via ESP-NOW
    esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
    esp_now_send(broadcastAddress_1, (uint8_t *) &myData, sizeof(myData));
    esp_now_send(broadcastAddress_2, (uint8_t *) &myData, sizeof(myData));



    // Print incoming readings
    printIncomingReadings();

    Firebase.setFloat(firebaseData, "Nha_A/Room2/Temperature", devicesData[0].temp);
    Firebase.setFloat(firebaseData, "Nha_A/Room2/Humidity", devicesData[0].hum);
    Firebase.setInt(firebaseData, "Nha_A/Room2/Motion", devicesData[0].motion);

    // increase the LED brightness
    if (gasSensorAnalog >= 100){
      for(int dutyCycle = 0; dutyCycle < 255; dutyCycle++){   
        // changing the LED brightness with PWM
        analogWrite(ledR, dutyCycle);
      }
      Firebase.setInt(firebaseData, "Nha_A/Room1/LedR", 1);
    }
    else {
      Firebase.setInt(firebaseData, "Nha_A/Room1/LedR", 0);
    }

    // control led firebase
    if (Firebase.getInt(firebaseData, "Nha_A/Room1/Led")){
      controlLed(ledY);
    } 

    lastTime = millis();    
  }
}
