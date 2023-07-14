import QRScanner from "./QRScanner";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
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
import Door from "./Door";
import Led from "./Led";
import Temp from "./Temp";
import Gas from "./Gas";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WeatherCard from "./WeatherCard";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import BLE from "./BLE";
const Stack = createStackNavigator();

function Home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 10 }}>
            <Swiper loop={true} autoplay={true} autoplayTimeout={5}>
              <WeatherCard />
              <WeatherCard />
            </Swiper>
          </View>
          <View
            style={{
              zIndex: 1,
              flex: 20,
              backgroundColor: colors.background2,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 20 }}>
                Đề xuất
              </Text>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(26,95,122,50)",
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Text>Tạo một thẻ đề xuất ở đây</Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 20 }}>
              My home
            </Text>
            <View style={[styles.contain, { marginLeft: 20, marginRight: 20 }]}>
              <View style={[styles.square]}>
                <TouchableOpacity
                  style={styles.device}
                  onPress={() => navigation.navigate("Led")}
                >
                  <Icon name="lamp" size={35} color={colors.logo} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.device}
                  onPress={() => navigation.navigate("Temp")}
                >
                  <Icon name="thermometer" size={35} color={colors.logo} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.device}
                  onPress={() => navigation.navigate("Door")}
                >
                  <Icon name="door" size={35} color={colors.logo} />
                </TouchableOpacity>
              </View>
              <View style={styles.square}>
                <TouchableOpacity
                  style={styles.device}
                  onPress={() => navigation.navigate("Chart")}
                >
                  <Icon name="chart-line" size={35} color={colors.logo} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.device}
                  onPress={() => navigation.navigate("BLE")}
                >
                  <Icon name="devices" size={35} color={colors.logo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.device}>
                  <Icon name="security" size={35} color={colors.logo} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function QRScannerScreen() {
  //  const navigation = useNavigation();
  //  navigation.navigate("QRScanner")
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
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          //headerShown: false,
          title: "",
          //headerTransparent: true, // Đặt thanh tiêu đề trong suốt
          headerTitleStyle: { color: "black" }, // Định dạng màu chữ của tiêu đề
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={QRScannerScreen}>
                <Image
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  source={require("../assets/device/qr-code.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 25, height: 25, marginRight: 10 }}
                  source={require("../assets/device/notification.png")}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                style={{ width: 25, height: 25, marginLeft: 10 }}
                source={require("../assets/device/user.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Door" component={Door} />
      <Stack.Screen name="Led" component={Led} />
      <Stack.Screen name="Temp" component={Temp} />
      <Stack.Screen name="Gas" component={Gas} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="BLE" component={BLE} />
    </Stack.Navigator>
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

  contain: {
    flex: 2,
    backgroundColor: "rgba(26,95,122,50)",
    marginBottom: 15,
  },
  square: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  device: {
    backgroundColor: "white",
    height: 70,
    width: 70,
    margin: 10,
    borderColor: colors.blue2,
    borderWidth: 3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Menu;
