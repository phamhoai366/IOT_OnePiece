import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../theme";
import Swiper from "react-native-swiper";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { reverseGeocodeAsync } from "expo-location";
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainDeviceScreen = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const handleTemperatureButtonPress = () => {
    // Set temperature value
    const randomTemp = Math.floor(Math.random() * 100);
    setTemperature(randomTemp);
  };
  const handleHumidityButtonPress = () => {
    const randomHumidity = Math.floor(Math.random() * 100);
    setHumidity(randomHumidity);
  };

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
        options={{ tabBarLabel: "MainDevice" }}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{ tabBarLabel: "Chatbot" }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: "History" }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{ tabBarLabel: "Notifications" }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: "Settings" }}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LightScreen"
        component={LightScreen}
        options={{ title: "Light" }}
      />
      <Stack.Screen
        name="TemperatureScreen"
        component={TemperatureScreen}
        options={{ title: "Temperature" }}
      />
      <Stack.Screen
        name="DoorScreen"
        component={DoorScreen}
        options={{ title: "Door" }}
      />
      <Stack.Screen
        name="ElectricityScreen"
        component={ElectricityScreen}
        options={{ title: "Electricity" }}
      />
      <Stack.Screen
        name="AirQualityScreen"
        component={AirQualityScreen}
        options={{ title: "Air" }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "Check camera" }}
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

  /*  if (!location) {
    return (
      <View >
        <Text>Loading...</Text>
      </View>
    );
  }
*/

  const handleTemperatureButtonPress = () => {
    if (temperature === 0) {
      // Set temperature value initially
      const randomTemp = Math.floor(Math.random() * 101) - 50;
      setTemperature(randomTemp);
    }

    // Toggle temperature updates
    setInterval(() => {
      setTemperature((prevTemperature) => {
        // Generate a new random temperature between -5 to 40
        let randomTemp = prevTemperature + Math.floor(Math.random() * 46) - 5; // Randomly change the temperature by -5 to 5

        // Limit the temperature within -5 to 40 range
        randomTemp = Math.max(-5, Math.min(40, randomTemp));

        return randomTemp;
      });
    }, 3000); // Update temperature every 5 seconds
  };

  const handleHumidityButtonPress = () => {
    if (humidity === 0) {
      // Set humidity value initially
      const randomHumidity = Math.floor(Math.random() * 100);
      setHumidity(randomHumidity);
    }

    // Toggle humidity updates
    setInterval(() => {
      setHumidity((prevHumidity) => {
        // Generate a new random humidity between 0 to 100
        const randomHumidity = Math.floor(Math.random() * 101);
        return randomHumidity;
      });
    }, 3000);
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
    // navigation.navigate('GasScreen');
  };

  const handleAddDeviceButtonPress = () => {
    // Chuyển hướng đến màn hình Thêm thiết bị (AddDeviceScreen)
    navigation.navigate("AddDeviceScreen");
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <Swiper loop={false} style={styles.swiperContainer}>
          <View style={styles.temperatureContainer}>
            <View style={styles.header}>
              <Image
                source={require("../assets/logo.jpg")}
                style={styles.logo}
              />
              <Text style={styles.wellcome}>Wellcome to IOT SmartHome!!!</Text>
            </View>
            <Text style={{ fontSize: 16 }}>{address}</Text>
            <Text>{date}</Text>
            <Text style={styles.temperatureText}>{temperature}°C</Text>
            {temperature > 30 && (
              <Icon name="weather-sunny" size={50} color={colors.primary} />
            )}
            {temperature <= 30 && temperature >= 20 && (
              <Icon name="weather-cloudy" size={50} color={colors.primary} />
            )}
            {temperature < 20 && (
              <Icon name="weather-rainy" size={50} color={colors.primary} />
            )}
            <Text style={styles.weatherConditionText}>{weatherText}</Text>
          </View>
          <View style={styles.humidityContainer}>
            <View style={styles.header}>
              <Image
                source={require("../assets/logo.jpg")}
                style={styles.logo}
              />
              <Text style={styles.wellcome}>Wellcome to IOT SmartHome!!!</Text>
            </View>
            <Text style={{ fontSize: 16 }}>{address}</Text>
            <Text>{date}</Text>
            <Text style={styles.humidityText}>{humidity}%</Text>
            <Icon name="water-outline" size={50} color={colors.primary} />
          </View>
        </Swiper>
      </View>
      <Text style={styles.deviceText}>Device</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.square}>
          <TouchableOpacity
            style={styles.device}
            onPress={handleLightButtonPress}
          >
            <Icon name="lightbulb-on" size={50} color={colors.primary} />
            <Text style={styles.text}>Đèn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleTemperatureButtonPress}
          >
            <Icon name="thermometer" size={50} color={colors.primary} />
            <Text style={styles.text}>Nhiệt độ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleDoorButtonPress}
          >
            <Icon name="door-open" size={50} color={colors.primary} />
            <Text style={styles.text}>Đóng/mở cửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          {/* Nút Độ ẩm */}
          <TouchableOpacity
            style={styles.device}
            onPress={handleHumidityButtonPress}
          >
            <Icon name="water-outline" size={50} color={colors.primary} />
            <Text style={styles.text}>Độ ẩm</Text>
          </TouchableOpacity>
          {/* Nút Khí gas */}
          <TouchableOpacity
            style={styles.device}
            onPress={handleGasButtonPress}
          >
            <Icon name="gas-cylinder" size={50} color={colors.primary} />
            <Text style={styles.text}>Khí gas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleAirQualityButtonPress}
          >
            <Icon name="air-filter" size={50} color={colors.primary} />
            <Text style={styles.text}>Chất lượng không khí</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.square, styles.squareBottom]}>
          <TouchableOpacity
            style={styles.device}
            onPress={handleElectricityButtonPress}
          >
            <Icon name="solar-power" size={50} color={colors.primary} />
            <Text style={styles.text}>Lượng điện sử dụng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.device}
            onPress={handleCameraButtonPress}
          >
            <Icon name="video" size={50} color={colors.primary} />
            <Text style={styles.text}>Check camera</Text>
          </TouchableOpacity>
          {/* Nút Thêm thiết bị */}
          <TouchableOpacity
            style={styles.device}
            onPress={handleAddDeviceButtonPress}
          >
            <Icon name="plus" size={50} color={colors.primary} />
            <Text style={styles.text}>Thêm thiết bị</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    margin: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    marginTop: -55,
    marginRight: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ff8080",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  wellcome: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  content: {
    flex: 0.7,
  },

  square: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "16%",
    alignItems: "center",
  },
  squareBottom: {
    marginTop: 10,
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
  scrollView: {
    flex: 1,
    marginTop: -30,
  },
  text: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  swiperContainer: {
    height: "100%",
    backgroundColor: "#ffcccc",
  },
  temperatureContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccc",
  },
  humidityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccc",
  },
  temperatureText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  humidityText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  deviceText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MainDeviceScreen;
