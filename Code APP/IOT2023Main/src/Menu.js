import { Component } from "react";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView,TouchableOpacity } from "react-native";
import MainDevice from "./MainDevice";
import { colors, sizes } from "../theme";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  off,
} from "firebase/database";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";

const Menu = () => {
  const [Gas, setGas] = useState([]);
  const [HeatIndex, setHeatIndex] = useState([]);
  const [Humidity, setHumidity] = useState([]);
  const [Led, setLed] = useState([]);
  const [Motion, setMotion] = useState([]);
  const [Temperature, setTemperature] = useState([]);
  const [NumberDevice, setNumberDevice] = useState([]);


  useEffect(() => {
    const db = getDatabase(FireBaseConfigAPP);
    const starCountRef = ref(db, "DiaChiNhaHoai/Room1/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setGas(data.Gas);
      setHeatIndex(data.HeatIndex);
      setHumidity(data.Humidity);
      setLed(data.Led);
      setMotion(data.Motion);
      setNumberDevice(data.NumberDevice);
      setTemperature(data.Temperature);
      console.log("data: ", data.Gas);
    });

    // Clean up listener when component unmounts
    return () => {
      off(child(ref(getDatabase(FireBaseConfigAPP))), "value");
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 2, flex: 10, backgroundColor: colors.blue1 }}>
          <Text style={{ fontSize: 40 }}>Dash Board</Text>
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollview}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.box}>
                <Text style={styles.text}>Temperature: {Temperature}</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.text}>
                  Số thiết bị đang kết nối: {NumberDevice}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.text}>Công suất sử dụng: 35 W</Text>
              </View>
            </ScrollView>
          </View>
        </View>

        <View
          style={{
            zIndex: 1,
            flex: 20,
            backgroundColor: colors.background2,
          }}
        >
          <MainDevice />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  box: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue2,
    marginRight: 20,
    borderRadius: 20,
    elevation: 4,
  },
  scrollview: {
    top: 100,
  },
});

export default Menu;
