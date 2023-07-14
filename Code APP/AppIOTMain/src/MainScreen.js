import { Component } from "react";
import React from "react";
import Menu from "./Menu";
import SettingScreen from "./SettingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chatbot from "./Chatbot";
import Icon from "react-native-vector-icons/FontAwesome";
import { Keyboard } from "react-native";

const Tab = createBottomTabNavigator();

const MainScreen = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Menu") {
            iconName = "home";
          } else if (route.name === "Trợ lí ảo") {
            iconName = "user";
          } else if (route.name === "Setting") {
            iconName = "cog";
          } else if (route.name === "Lập lịch") {
            iconName = "clock-o";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
      <Tab.Screen name="Lập lịch" component={Menu} options={{ headerShown: false }}/>
      <Tab.Screen name="Trợ lí ảo" component={Chatbot} options={{ headerShown: true }}/>
      <Tab.Screen name="Setting" component={SettingScreen} options={{ headerShown: true }}/>
    </Tab.Navigator>

);

export default MainScreen;
