import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/Signup';
import ForgotPassScreen from './src/ForgotPass';
import ResetPasswordScreen from './src/ResetPasswordScreen';
import MainDeviceScreen from './src/MainDeviceScreen';
import LightScreen from "./src/LightScreen";
import TemperatureScreen from "./src/TemperatureScreen";
import DoorScreen from "./src/DoorScreen";
import ElectricityScreen from "./src/ElectricityScreen";
import AirQualityScreen from "./src/AirQualityScreen";
import CameraScreen from "./src/CameraScreen";
import Help from "./src/Help";
import DarkMode from "./src/DarkMode";
import AppIntroduction from "./src/AppIntroduction";
import NotificationScreen from "./src/NotificationScreen";
import AddDeviceScreen from "./src/AddDeviceScreen";
import Settings from './src/SettingScreen';
const Stack = createStackNavigator();

import { View, Text, StyleSheet, Image } from "react-native";
import axios from 'axios';

const App = () => {
/*
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [H, setH] = useState(0);
  const [timenow, setTime] = useState();
  const [day, setDay] = useState();
  const API_KEY = "dc21b0d642811c70dfd343865abd69a4"

*/
  return (
   
   
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerMode: 'false' }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
          <Stack.Screen name="MainDeviceScreen" component={MainDeviceScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="LightScreen" component={LightScreen} />
          <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} />
          <Stack.Screen name="DoorScreen" component={DoorScreen} />
          <Stack.Screen name="ElectricityScreen" component={ElectricityScreen} />
          <Stack.Screen name="AirQualityScreen" component={AirQualityScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="DarkMode" component={DarkMode} />
          <Stack.Screen name="AppIntroduction" component={AppIntroduction} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="AddDeviceScreen" component={AddDeviceScreen} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    
     
/*
      <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View
          style={[
            styles.cardImage,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.text1}>Hà Nội</Text>
            <Text style={styles.text1}>{timenow}, {day} </Text>
            <Text style={{ fontSize: 40, color: "white" }}>{temperature} °C</Text>
            <Text style={styles.text1}>Tốc độ gió: {wind} m/s</Text>
            <Text style={styles.text1}>Tốc độ ẩm: {H} %</Text>
          </View>
          <Image
            style={{
              width: 150,
              height: 150,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 20,
              backgroundColor: "white"
            }}
            source={require("./assets/onepice.jpg")}
          />
        </View>
      </View>
    </View>
    */
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    elevation: 5,
    borderRadius: 20,
  },
  cardImage: {
    flexDirection: "row",
  },
  cardContent: {
    backgroundColor: "#5c79ff",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  text1: {
    margin: 2,
    color: "white",
    fontSize: 16
  },
});
export default App;

