import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../theme";

const Door = () => {
  const [unlockMethod, setUnlockMethod] = useState("");

  const unlockDoor = (method) => {
    setUnlockMethod(method);
    // Thực hiện logic mở khóa dựa trên phương pháp đã chọn
    console.log("Unlocking door using:", method);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.frame}>
        <Text style={styles.title}>Smart Lock</Text>
        <Image
          source={require("../assets/device/doorknob.png")}
          style={styles.logo}
        />
        <Text>Unlock Method: {unlockMethod}</Text>
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => unlockDoor("Bluetooth")}
            >
              <Icon name="bluetooth" size={24} color="#000000" />
              <Text style={styles.buttonText}>Bluetooth</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => unlockDoor("Remote Wifi")}
            >
              <Icon name="wifi" size={24} color="#000000" />
              <Text style={styles.buttonText}>Wifi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => unlockDoor("Face Recognition")}
            >
              <Icons name="face" size={24} color="#000000" />
              <Text style={styles.buttonText}>Face Recognition</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => unlockDoor("History")}
            >
              <Icon name="time" size={24} color="#000000" />
              <Text style={styles.buttonText}>Unlock History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  frame: {
    flex: 1,
    borderWidth: 10,
    borderColor: "#ff8080",
    borderRadius: 10,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  gridContainer: {
    width: "100%",
    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffff",
    borderWidth: 5,
    borderColor: "#ff8080",

    padding: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 20,
    marginRight: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Door;
