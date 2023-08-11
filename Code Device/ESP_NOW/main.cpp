// MACt: bc:dd:c2:80:fe:3f
// MACn: 48:55:19:e4:8b:27

// Working space ... room2

// Include Libraries
#ifdef ESP32
  #include <WiFi.h>
#else
  #include <ESP8266WiFi.h>
#endif

#include <espnow.h>
#include <Servo.h>

#define ledR D1
#define ledY D2
#define Motion D4
#define SERVO_PIN D3


// Define variables to store DHT readings to be sent
float temperature;
float humidity;
int gasSensorAnalog;
int isMotion;

Servo myservo1;
int pos = 0;
  

// Define variables to store incoming readings
float incomingTemp;
float incomingHum;
int incomingGas;
int incomingLed;
int incomingLed3;
int incomingDoor3;

// Variable to store if sending data was successful
String success;

// REPLACE WITH RECEIVER MAC Address
uint8_t broadcastAddress[] = {0x48, 0x55, 0x19, 0xE4, 0xFB, 0xCF};    // host 
// uint8_t broadcastAddress_1[] = {0xbc, 0xdd, 0xc2, 0x80, 0xfe, 0x3f};
// uint8_t broadcastAddress_2[] = {0x80, 0x7D, 0x3A, 0xB9, 0x16, 0x14};
// uint8_t broadcastAddress[] = {0x48, 0x55, 0x19, 0xe4, 0x8b, 0x27};

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

unsigned long lastTime = 0;  
unsigned long timerDelay = 2000;  // send readings timer

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
  memcpy(&incomingReadings, incomingData, sizeof(incomingReadings));
  Serial.print("Bytes received: ");
  Serial.println(len);
  incomingTemp = incomingReadings.temp;
  incomingHum = incomingReadings.hum;
  incomingGas = incomingReadings.gas;
  incomingLed = incomingReadings.led2;
  incomingLed3 = incomingReadings.led3;
  incomingDoor3 = incomingReadings.door3;
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
  Serial.print("Gas: ");
  Serial.println(incomingGas);
  Serial.print("Led2: ");
  Serial.println(incomingLed);
  Serial.print("Led3: ");
  Serial.println(incomingLed3);
  Serial.print("Door: ");
  Serial.println(incomingDoor3); 
}

void setup() {
  // Init Serial Monitor
  Serial.begin(115200);

  myservo1.attach(SERVO_PIN);
  
  pinMode(Motion, INPUT);
  pinMode(ledR, OUTPUT); 
  pinMode(ledY, OUTPUT);
 
  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != 0) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Once ESPNow is successfully Init, we will register for Send CB to
  // get the status of Trasnmitted packet
  esp_now_set_self_role(ESP_NOW_ROLE_COMBO);

  esp_now_register_send_cb(OnDataSent);
  
  // Register peer
  esp_now_add_peer(broadcastAddress, ESP_NOW_ROLE_COMBO, 1, NULL, 0);

  esp_now_register_recv_cb(OnDataRecv);
}
 
void loop() {
  if ((millis() - lastTime) > timerDelay) {
    
    // Set values to send
    isMotion = digitalRead(Motion);

    //set values to send
    myData.temp = temperature;
    myData.hum = humidity;  
    myData.gas = gasSensorAnalog;
    myData.motion = isMotion;

    // Send message via ESP-NOW
    esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));

    // Print incoming readings
    printIncomingReadings();

    analogWrite(ledY, 255 - incomingLed3);     //if la esp8266 to

    // increase the LED brightness
    if (incomingGas >= 100){
      for(int dutyCycle = 0; dutyCycle < 255; dutyCycle++){   
      // changing the LED brightness with PWM
        analogWrite(ledR, dutyCycle);    
      }
    }

    if (incomingDoor3 == 1){
        myservo1.write(180);
    }

    if (incomingDoor3 == 0){
      myservo1.write(0);
    }

    lastTime = millis();
  }
}