import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from 'axios';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Card = () => {
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
      <View style={styles.cardContainer}>
        <Text style={styles.text1}>Chất lượng không khí</Text>
         <AnimatedCircularProgress
            size={200}
            width={30}
            fill={pm25*100/500}
            arcSweepAngle={180}
            rotation={270}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#f8fbff"
            >
            {
              (fill) => (
                <Text style={{ color: "white", fontSize: 20 }}>
                  {pm25}
                </Text>
              )
            }
          </AnimatedCircularProgress>
      </View>
    );
};

const InforAir = () => {
  return <Card />;
};
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    elevation: 2,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#5c79ff",
    
  },
  text1: {
    marginTop:40,
    fontSize: 20,
    color:"white"
  },
});

export default InforAir;



