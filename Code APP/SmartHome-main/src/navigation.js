import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/SplashScreen';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/Signup';
import ForgotPassScreen from './src/ForgotPass';
import DashboardScreen from './src/Dashboard';
import ResetPasswordScreen from './src/ResetPasswordScreen';
//import { createAppContainer } from 'react-navigation';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerMode: 'false' }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
