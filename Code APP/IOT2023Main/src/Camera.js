import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

// ...
const Camera = () => {
  return(
  <View style={{ flex: 1 }} >
    <WebView
      source={{ uri: "https://www.facebook.com/" }}
      style={{ flex: 1 }}
    />
  </View>
  )
};
export default Camera;
