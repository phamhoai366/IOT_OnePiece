import React, { useState } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text, StyleSheet,Button } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {

  const [url, setUrl] = useState('https://www.google.com');
  const handleUrlChange = (text) => {
    setUrl(text);
  };

  const handleGoButtonPress = () => {
    
  };

  return (
    <WebView source={{ uri: 'https://www.google.com' }} style={{ flex: 1 , marginTop: StatusBar.currentHeight || 0,}} />
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#3360ff",
    alignItems: "center", 
    justifyContent: "center" ,
    margin: 30,
    borderRadius:10
  },
  text1: {
    color: "white",
    fontSize: 16
  },
});




