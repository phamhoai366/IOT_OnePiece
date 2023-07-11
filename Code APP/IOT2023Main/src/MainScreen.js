import { Component } from "react";
import React from "react";
import Menu from "./Menu";
import SettingScreen from "./SettingScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainScreen = () => (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={Menu} />
        <Tab.Screen name="Lập lịch" component={Menu} />
        <Tab.Screen name="Trợ lí ảo" component={Menu} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
);

export default MainScreen;
