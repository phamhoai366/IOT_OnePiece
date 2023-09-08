import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from 'axios';

const Card = () => {

  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [H, setH] = useState(0);
  const [timenow, setTime] = useState();
  const [day, setDay] = useState();
  const API_KEY = "dc21b0d642811c70dfd343865abd69a4"

  useEffect(() => {
    const today = new Date();
    const timenow = today.getHours() + "h" + today.getMinutes();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    setTime(timenow)
    setDay(date)
    console.log(date);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${API_KEY}`
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${API_KEY}`)
      .then(response => {
        const t = response.data.main.temp;
        const w = response.data.wind.speed;
        setWind(w)
        setTemperature(t - 273.15)
        setH(response.data.main.humidity)

      })
      .catch(error => {
        console.error(error);
      });

  });



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
            <Text style={styles.text1}>{timenow}, {day} </Text>
            <Text style={{ fontSize: 40, color: "white" }}>{temperature} °C</Text>
            <Text style={styles.text1}>Tốc độ gió: {wind} m/s</Text>
            <Text style={styles.text1}>Tốc độ ẩm: {H} %</Text>
          </View>
          <Image
            style={{
              width: 150,
              height: 150,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 20,
              backgroundColor: "white"
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
    elevation: 2,
    
  },
  cardImage: {
    flexDirection: "row",
  },
  cardContent: {
    backgroundColor: "#5c79ff",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  text1: {
    margin: 2,
    color: "white",
    fontSize: 16
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
