import React, { useState ,useEffect} from "react";
import { View, StyleSheet, Text, StatusBar, Image } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';

export default function TemperatureScreen() {
  const [pm25, setPM25] = useState(null);
    const API_KEY = "01553ea3-817e-48b3-b1a5-5a94ff5773a4"
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://api.airvisual.com/v2/city?city=Hanoi&state=Hanoi&country=Vietnam&key=${API_KEY}`);
          const data = response.data;
          const pm25Value = data.data.current.pollution.aqicn;
          setPM25(pm25Value);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

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
          

          <AnimatedCircularProgress
            size={200}
            width={30}
            fill={pm25*100/500}
            arcSweepAngle={180}
            rotation={270}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
            //style={{marginTop:10}} 
            >
            {
              (fill) => (
                <Text style={{ color: "#3360ff", fontSize: 20 }}>
                  {pm25}
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{ color: "#3360ff", fontSize: 20 ,}}>Chất lượng không khí</Text>
        

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
