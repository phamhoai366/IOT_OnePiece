import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../theme";

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View
          style={[
            styles.cardImage,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.text1}>Hà Nội</Text>
            <Text style={styles.text1}>13h00, Mon,16 AUG 2023 </Text>
            <Text style={{ fontSize: 40 }}>25 °C</Text>
            <Text style={styles.text1}>Tốc độ gió</Text>
            <Text style={styles.text1}>Tốc độ gió</Text>
          </View>
          <Image
            style={{
              width: 150,
              height: 150,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 20,
              backgroundColor:"white"
            }}
            source={require("../assets/weather/clouds.png")}
          />
        </View>
      </View>
    </View>
  );
};

const WeatherCard = () => {
  return <Card />;
};
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    elevation: 10,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
  },
  cardImage: {
    flexDirection: "row",
  },
  cardContent: {
    backgroundColor: colors.blue1,
    height: "100%",
    width: "100%",
    padding: 20,
  },
  text1: {
    margin: 2,
  },
});

export default WeatherCard;


/*


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


*/
