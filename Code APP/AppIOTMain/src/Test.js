import React from "react";
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import Card from "./Card";
function App() {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
      <Swiper loop={true} autoplay={true} autoplayTimeout={5}>
        <Card />

        <Card />
        <Card />
      </Swiper>
      </View>
      <View style={{flex:1}}></View>
    </View>
  );
}

export default App;
