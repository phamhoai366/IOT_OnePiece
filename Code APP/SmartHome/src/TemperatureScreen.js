import React, { useState ,useEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
  getDatabase,
  ref,
  onValue
} from "firebase/database";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";

export default function TemperatureScreen() {
  const [temperature, setTemperature] = useState(0);

  const handleLoginFaceBook = () => { };
  const handleLoginGoogle = () => { };
  const handleLoginFaceID = () => { };

  useEffect(() => {
    const db = getDatabase(FireBaseConfigAPP);
    const starCountRef = ref(db, 'Nha_A/Room1/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data.Temperature)
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
        backgroundColor: "#f8fbff"
      }}>
        <View style={styles.Part1}>
          <Text style={{ color: "#3360ff", fontSize: 30 , marginTop:-50}}>Nhiệt độ</Text>

          <AnimatedCircularProgress
            size={270}
            width={30}
            fill={temperature*100/50}
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
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleLoginFaceBook}>
              <Image
                style={styles.logingg}
                source={require("../assets/fan.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginGoogle}>
              <Image
                style={styles.logingg}
                source={require("../assets/on-off-button.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginFaceID}>
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
