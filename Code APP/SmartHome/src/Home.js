import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MainDeviceScreen from "./src/MainDeviceScreen";
import ChatbotScreen from "./src/ChatbotScreen";
import HistoryScreen from "./src/HistoryScreen";
import NotificationScreen from "./src/NotificationScreen";
import SettingScreen from "./src/SettingScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'MainDeviceScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ChatbotScreen') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            } else if (route.name === 'HistoryScreen') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'NotificationScreen') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'SettingScreen') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="MainDeviceScreen" component={MainDeviceScreen} options={{ tabBarLabel: 'Main Device' }} />
        <Tab.Screen name="ChatbotScreen" component={ChatbotScreen} options={{ tabBarLabel: 'Chatbot' }} />
        <Tab.Screen name="HistoryScreen" component={HistoryScreen} options={{ tabBarLabel: 'History' }} />
        <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{ tabBarLabel: 'Notifications' }} />
        <Tab.Screen name="SettingScreen" component={SettingScreen} options={{ tabBarLabel: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
