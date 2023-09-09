import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DropDown from './DropDown';
import {
  getDatabase,
  ref,
  onValue
} from "firebase/database";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";




export default function TemperatureScreen() {

  const [temperature, setTemperature] = useState(0);
  const [Room, setRoom] = useState("Room1");

  const handleFan = () => { };
  const handleOnOff = () => { };
  const handlethermometer = () => { };

  const data = [
    { label: 'LivingRoom', value: 'LivingRoom' },
    { label: 'Kitchen', value: 'Kitchen' },
    { label: 'BedRoom', value: 'BedRoom' },
    { label: 'WorkRoom', value: 'WorkRoom' },
  ];

// Xử lí việc chọn Item
  const handleSelect = (item) => {
    
    if(item.value=='LivingRoom'){
      setRoom("Room4")
      console.log(1);
    }
    if(item.value=='Kitchen'){
      setRoom("Room1")
      console.log(2);
    }
    if(item.value=='BedRoom'){
      setRoom("Room2")
      console.log(3);
    }
    if(item.value=='WorkRoom'){
      setRoom("Room3")
      console.log(4);
    }

  };

  useEffect(() => {
    const db = getDatabase(FireBaseConfigAPP);
    const starCountRef = ref(db, "Nha_A/" + `${Room}` + "/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data.Temperature)
      //console.log(data.Temperature)
    });
  });



  return (
    <View style={{
      flex: 1, marginTop: StatusBar.currentHeight || 0,
    }}>
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#d0efff"
      }}>
        <Image
          style={{
            width: 170,
            height: 170,

          }}
          source={require("../assets/air-conditioner.png")}
          resizeMode="contain"
        />
      </View>
      <View style={{
        flex: 4,
        //backgroundColor: "#d0efff"
      }}>
        <View style={styles.Part1}>
          <Text style={{ color: "#3360ff", fontSize: 25, marginTop: -50 }}>Nhiệt độ phòng</Text>

          <AnimatedCircularProgress
            size={200}
            width={30}
            fill={temperature * 100 / 50}
            arcSweepAngle={180}
            rotation={270}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
            style={{}} >
            {
              (fill) => (
                <Text style={{ color: "#3360ff", fontSize: 30 }}>
                  {temperature} °C
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <DropDown label="Select an option" data={data} onSelect={handleSelect} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleFan}>
              <Image
                style={styles.logingg}
                source={require("../assets/fan.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnOff}>
              <Image
                style={styles.logingg}
                source={require("../assets/on-off-button.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlethermometer}>
              <Image
                style={styles.logingg}
                source={require("../assets/thermometer.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Part1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logingg: {
    width: 60,
    height: 60,
    margin: 20,
  },
})
