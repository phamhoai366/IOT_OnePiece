import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../theme";
import Swiper from "react-native-swiper";
import * as Location from "expo-location";


// Import screens from separate code.js files
import Chatbot from "../src/ChatbotScreen";
import History from "../src/HistoryScreen";
import Notification from "../src/NotificationScreen";
import Settings from "../src/SettingScreen";

import LightScreen from "../src/LightScreen";
import TemperatureScreen from "../src/TemperatureScreen";
import DoorScreen from "../src/DoorScreen";
import ElectricityScreen from "../src/ElectricityScreen";
import AirQualityScreen from "../src/AirQualityScreen";
import CameraScreen from "../src/CameraScreen";
import WeatherCard from "./WeatherCard";
import Humidity from "./Humidity"
import InforCard from "./InforCard";
import InforAir from "./InforAir";
import Gas from "./Gas";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const API_KEY="dc21b0d642811c70dfd343865abd69a4"
let url=`http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${API_KEY}`
const MainDeviceScreen = () => {


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "MainDevice") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chatbot") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="MainDevice"
        component={Device}
        options={{ tabBarLabel: "MainDevice" ,headerShown: false }}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{ tabBarLabel: "Chatbot" ,headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: "History",headerShown: false  }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{ tabBarLabel: "Notifications",headerShown: false  }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: "Settings",headerShown: false  }}
      />
    </Tab.Navigator>
  );
};
const Device = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{ headerShown: false ,headerShown: false }}
      />
      <Stack.Screen
        name="LightScreen"
        component={LightScreen}
        options={{ title: "Light",headerShown: false }}
      />
      <Stack.Screen
        name="TemperatureScreen"
        component={TemperatureScreen}
        options={{ title: "Temperature",headerShown: false  }}
      />
      <Stack.Screen
        name="DoorScreen"
        component={DoorScreen}
        options={{ title: "Door",headerShown: false  }}
      />
      <Stack.Screen
        name="ElectricityScreen"
        component={ElectricityScreen}
        options={{ title: "Electricity",headerShown: false  }}
      />
      <Stack.Screen
        name="AirQualityScreen"
        component={AirQualityScreen}
        options={{ title: "Air",headerShown: false  }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "Check camera",headerShown: false  }}
      />
     <Stack.Screen
        name="Humidity"
        component={Humidity}
        options={{ title: "Độ ẩm",headerShown: false  }}
      />
      <Stack.Screen
        name="Gas"
        component={Gas}
        options={{ title: "Gas",headerShown: false  }}
      />
    </Stack.Navigator>
  );
};
const MainTab = ({ navigation }) => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Đảo ngược geocoding
        let result = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (result.length > 0) {
          let address = `${result[0].name}, ${result[0].city}, ${result[0].region}`;
          setAddress(address);
        }

        // Lấy ngày và giờ hiện tại
        let currentDate = new Date().toLocaleDateString();
        setDate(currentDate);
      } catch (error) {
        setErrorMsg("Failed to get location");
      }
    })();
  }, []);

  const handleTemperatureButtonPress = () => {
    navigation.navigate("TemperatureScreen");
  };

  const handleHumidityButtonPress = () => {
    navigation.navigate("Humidity");
  };
  // Define the weather text based on temperature
  let weatherText = "";
  if (temperature > 30) {
    weatherText = "Hot";
  } else if (temperature <= 30 && temperature >= 20) {
    weatherText = "Warm";
  } else if (temperature < 20) {
    weatherText = "Cool";
  }
  const handleLightButtonPress = () => {
    navigation.navigate("LightScreen");
  };

  const handleDoorButtonPress = () => {
    navigation.navigate("DoorScreen");
  };

  const handleElectricityButtonPress = () => {
    navigation.navigate("ElectricityScreen");
  };

  const handleAirQualityButtonPress = () => {
    navigation.navigate("AirQualityScreen");
  };

  const handleCameraButtonPress = () => {
    navigation.navigate("CameraScreen");
  };

  const handleGasButtonPress = () => {
    // Chuyển hướng đến màn hình Khí gas (GasScreen)
     navigation.navigate('Gas');
  };

  const handleAddDeviceButtonPress = () => {
    // Chuyển hướng đến màn hình Thêm thiết bị (AddDeviceScreen)
    navigation.navigate("AddDeviceScreen");
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <Swiper  loop={true} autoplay={true} autoplayTimeout={8} dotColor="white" >
          <InforCard/>
          <WeatherCard/>
          <InforAir/>
        </Swiper>
      </View>
      <Text style={styles.deviceText}>Device</Text>
      <View style={styles.scrollView}>
        <View style={styles.square}>
          <TouchableOpacity
            style={styles.device}
            onPress={handleLightButtonPress}
          >
            <Icon name="lightbulb-on" size={40} color={colors.primary} />
            <Text style={styles.text}>Đèn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleTemperatureButtonPress}
          >
            <Icon name="thermometer" size={40} color={colors.primary} />
            <Text style={styles.text}>Nhiệt độ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleDoorButtonPress}
          >
            <Icon name="door-open" size={40} color={colors.primary} />
            <Text style={styles.text}>Đóng/mở cửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          {/* Nút Độ ẩm */}
          <TouchableOpacity
            style={styles.device}
            onPress={handleHumidityButtonPress}
          >
            <Icon name="water-outline" size={40} color={colors.primary} />
            <Text style={styles.text}>Độ ẩm</Text>
          </TouchableOpacity>
          {/* Nút Khí gas */}
          <TouchableOpacity
            style={styles.device}
            onPress={handleGasButtonPress}
          >
            <Icon name="gas-cylinder" size={40} color={colors.primary} />
            <Text style={styles.text}>Khí gas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleAirQualityButtonPress}
          >
            <Icon name="air-filter" size={40} color={colors.primary} />
            <Text style={styles.text}>Chất lượng không khí</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.square, styles.squareBottom]}>
          <TouchableOpacity
            style={styles.device}
            onPress={handleElectricityButtonPress}
          >
            <Icon name="solar-power" size={40} color={colors.primary} />
            <Text style={styles.text}>Tiêu thụ điện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleCameraButtonPress}
          >
            <Icon name="video" size={40} color={colors.primary} />
            <Text style={styles.text}>Check camera</Text>
          </TouchableOpacity>
          {/* Nút Thêm thiết bị */}
          <TouchableOpacity
            style={styles.device}
            onPress={handleAddDeviceButtonPress}
          >
            <Icon name="plus" size={40} color={colors.primary} />
            <Text style={styles.text}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  wellcome: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  content: {
    flex: 5,
  },
  square: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "22%",
    alignItems: "center",
  },
  squareBottom: {
    marginTop: 10,
  },
  device: {
    //backgroundColor: colors.white,
    height: "100%",
    margin: 5,
    borderColor: "#3360ff",
    borderWidth: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginTop: 100,
  },
  scrollView: {
    flex: 10,
    backgroundColor:"#f8fbff"
  },
  text: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  deviceText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor:"#f8fbff"
  },
});

export default MainDeviceScreen;
