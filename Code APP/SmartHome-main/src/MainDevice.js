import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../theme";

// Import screens from separate code.js files
import Chatbot from "../src/ChatbotScreen";
import History from "../src/HistoryScreen";
import Notification from "../src/NotificationScreen";
import Setting from "../src/SettingScreen";

import LightScreen from "../src/LightScreen";
import TemperatureScreen from "../src/TemperatureScreen";
import DoorScreen from "../src/DoorScreen";
import ElectricityScreen from "../src/ElectricityScreen";
import AirQualityScreen from "../src/AirQualityScreen";
import CameraScreen from "../src/CameraScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainDevice = () => {
  const [temperature, setTemperature] = useState(0);

  const handleTemperatureButtonPress = () => {
    // Set temperature value
    const randomTemp = Math.floor(Math.random() * 100);
    setTemperature(randomTemp);
  };

  return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainTab} options={{ headerShown: false }} />
        <Stack.Screen name="LightScreen" component={LightScreen} options={{ title: 'Light' }} />
        <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} options={{ title: 'Temperature' }} />
        <Stack.Screen name="DoorScreen" component={DoorScreen} options={{ title: 'Door' }} />
        <Stack.Screen name="ElectricityScreen" component={ElectricityScreen} options={{ title: 'Electricity' }} />
        <Stack.Screen name="AirQualityScreen" component={AirQualityScreen} options={{ title: 'Air' }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Check camera' }} />
      </Stack.Navigator>
  );
};

const MainTab = ({ navigation }) => {
  const [temperature, setTemperature] = useState(0);

  const handleLightButtonPress = () => {
    navigation.navigate('LightScreen');
  };

  const handleTemperatureButtonPress = () => {
    navigation.navigate('TemperatureScreen');
  };

  const handleDoorButtonPress = () => {
    navigation.navigate('DoorScreen');
  };

  const handleElectricityButtonPress = () => {
    navigation.navigate('ElectricityScreen');
  };

  const handleAirQualityButtonPress = () => {
    navigation.navigate('AirQualityScreen');
  };

  const handleCameraButtonPress = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.temperatureContainer}>
        <Icon name="water" size={50} color={colors.primary} />
        <Text style={styles.temperatureText}>{temperature}°C</Text>
      </View>
      <Text style={styles.temperatureText}>Device</Text>
      <View style={styles.square}>
        <TouchableOpacity style={styles.device} onPress={handleLightButtonPress}>
          <Icon name="lightbulb-on" size={50} color={colors.primary} />
          <Text style={styles.text}>Đèn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.device} onPress={handleTemperatureButtonPress}>
          <Icon name="thermometer" size={50} color={colors.primary} />
          <Text style={styles.text}>Nhiệt độ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.device} onPress={handleDoorButtonPress}>
          <Icon name="door-open" size={50} color={colors.primary} />
          <Text style={styles.text}>Đóng/mở cửa</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.square, styles.squareBottom]}>
        <TouchableOpacity style={styles.device} onPress={handleElectricityButtonPress}>
          <Icon name="solar-power" size={50} color={colors.primary} />
          <Text style={styles.text}>Lượng điện sử dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.device} onPress={handleCameraButtonPress}>
          <Icon name="video" size={50} color={colors.primary} />
          <Text style={styles.text}>Check camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.device} onPress={handleAirQualityButtonPress}>
          <Icon name="air-filter" size={50} color={colors.primary} />
          <Text style={styles.text}>Chất lượng không khí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    margin: 10,
  },
  square: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "15%",
    alignItems: "center",
  },
  squareBottom: {
    marginTop: 30,
  },
  device: {
    backgroundColor: colors.white,
    height: "100%",
    margin: 7,
    borderColor: "#800000",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginTop: 100,
  },
  text: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  temperatureContainer: {
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffcccc',
  },
  temperatureText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default MainDevice;
