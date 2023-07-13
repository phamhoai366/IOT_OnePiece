import { Component } from "react";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
import Chart from "./Chart";
import LoginScreen from "./LoginScreen";
import Door from "./Door";
import Led from "./Led";
import Temp from "./Temp";
import Gas from "./Gas";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "./Card"

const Stack = createStackNavigator();

function Home({navigation}){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View
            style={{ zIndex: 2, flex: 10, backgroundColor: colors.blue1 }}
          >
            <Card/>
          </View>
          <View
            style={{
              zIndex: 1,
              flex: 20,
              backgroundColor: colors.background2,
            }}
          >
            <View style={[{ top: 100 }, styles.contain]}>
              <View style={styles.square}>
                <TouchableOpacity
                  style={styles.device}
                    onPress={() => navigation.navigate("Led")}
                >
                  <Icon name="lamp" size={35} color="#900" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.device}
                    onPress={() => navigation.navigate("Temp")}
                >
                  <Icon name="lamp" size={35} color="#900" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.device}
                    onPress={() => navigation.navigate("Door")}
                >
                  <Icon name="door" size={35} color="#900" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.device}
                    onPress={() => navigation.navigate("Gas")}
                >
                  <Icon name="air-filter" size={35} color="#900" />
                </TouchableOpacity>
              </View>
              <View style={[{ top: -50 }, styles.square]}>
                <TouchableOpacity
                  style={styles.device}
                  //  onPress={() => navigation.navigate("Chart")}
                >
                  <Icon name="solar-power" size={35} color="#900" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.device}>
                  <Icon name="lamp" size={35} color="#900" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.device}>
                  <Icon name="lamp" size={35} color="#900" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.device}>
                  <Icon name="lamp" size={35} color="#900" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Menu = () => {
  const [GasRoom, setGas] = useState([]);
  const [HeatIndex, setHeatIndex] = useState([]);
  const [Humidity, setHumidity] = useState([]);
  const [LedRoom, setLed] = useState([]);
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
  <Stack.Navigator >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Door" component={Door} />
    <Stack.Screen name="Led" component={Led} />
    <Stack.Screen name="Temp" component={Temp} />
    <Stack.Screen name="Gas" component={Gas} />
  </Stack.Navigator>)
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
  contain: {
    flex: 1,
    margin: 10,
  },
  square: {
    flexDirection: "row",
    height: "25%",
    margin: 20,
    alignItems: "center",
  },
  device: {
    backgroundColor: "white",
    height: "60%",
    width: "20%",
    margin: 10,
    borderColor: colors.blue2,
    borderWidth: 3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Menu;
