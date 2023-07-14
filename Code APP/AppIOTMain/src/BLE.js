import React, { useEffect, useState } from "react";
import { View, Button, PermissionsAndroid, Platform } from "react-native";
import BleManager from "react-native-ble-manager";

const BLE = () => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);

  useEffect(() => {
    initializeBluetooth();
  }, []);

  const initializeBluetooth = async () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission for Bluetooth",
          message:
            "Grant permission to access your location for Bluetooth connection.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission denied");
        return;
      }
    }

    BleManager.start({ showAlert: false }).then(() => {
      setIsBluetoothEnabled(true);
    });
  };

  const connectToDevice = async () => {
    try {
      await BleManager.scan([], 5, true);

      setTimeout(async () => {
        const devices = await BleManager.getDiscoveredPeripherals();

        // Tìm thiết bị Bluetooth của bạn trong danh sách `devices`
        const deviceToConnect = devices.find(
          (device) => device.name === "Tên thiết bị Bluetooth của bạn"
        );

        if (deviceToConnect) {
          BleManager.connect(deviceToConnect.id)
            .then(() => {
              console.log("Connected to device:", deviceToConnect);

              const messageToSend = "Hello world";
              const serviceUUID = "YOUR_SERVICE_UUID";
              const characteristicUUID = "YOUR_CHARACTERISTIC_UUID";

              const bytes = stringToBytes(messageToSend);
              BleManager.write(
                deviceToConnect.id,
                serviceUUID,
                characteristicUUID,
                bytes
              )
                .then(() => {
                  console.log("Message sent successfully");
                })
                .catch((error) => {
                  console.log("Error sending message:", error);
                });
            })
            .catch((error) => {
              console.log("Connection error:", error);
            });
        } else {
          console.log("Bluetooth device not found");
        }
      }, 5000);
    } catch (error) {
      console.log("Scan error:", error);
    }
  };

  const stringToBytes = (string) => {
    const bytes = [];
    for (let i = 0; i < string.length; i++) {
      bytes.push(string.charCodeAt(i));
    }
    return bytes;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Connect and Send"
        onPress={connectToDevice}
        disabled={isBluetoothEnabled}
      />
    </View>
  );
};

export default BLE;
