import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  getDatabase,
  ref,
  update,
} from "firebase/database";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";

const App = () => {


 const HandleDoor = () => {
  const db = getDatabase(FireBaseConfigAPP);
  //const starCountRef = ref(db, "Nha_A/Room1/");
  update(ref(db, "Nha_A/Room4" + "/"), {
    Door: 1,
  }).then(() => {
    console.log("Thành công")
  });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.frame}>
        <Text style={styles.title}>Smart Lock</Text>
        <Image source={require("../assets/lock.png")} style={styles.logo} />
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={HandleDoor}
            >
              <Image
                source={require("../assets/on-off-button.png")}
                style={{ width: 20, height: 20}}
              />
              <Text style={styles.buttonText}>Open</Text>
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
    backgroundColor: "#9ec9ff",
    padding: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  frame: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -21,
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
    justifyContent: "center",
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffff",
    borderWidth: 5,
    borderColor: "#3360ff",
    padding: 20,
    borderRadius: 20,
    width: "50%",
    height: 100,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default App;
