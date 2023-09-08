import React, { useState ,useEffect} from "react";
import { View, StyleSheet, Text, StatusBar, Image } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
  getDatabase,
  ref,
  onValue
} from "firebase/database";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";

export default function TemperatureScreen() {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const db = getDatabase(FireBaseConfigAPP);
    const starCountRef = ref(db, 'Nha_A/Room1/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data.Humidity)
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
          <Text style={{ color: "#3360ff", fontSize: 30 , marginTop:-50}}>Độ ẩm</Text>

          <AnimatedCircularProgress
            size={270}
            width={30}
            fill={temperature}
            arcSweepAngle={180}
            rotation={270}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
            style={{}} >
            {
              (fill) => (
                <Text style={{ color: "#3360ff", fontSize: 30 }}>
                  {temperature} %
                </Text>
              )
            }
          </AnimatedCircularProgress>
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
