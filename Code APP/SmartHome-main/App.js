import React, { useState,useContext} from 'react';
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

const App = () => {
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
  );
}

export default App;

