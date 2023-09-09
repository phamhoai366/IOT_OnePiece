import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Card = () => {
    const [pm25, setPM25] = useState(null);
    const [scolor, setColor] = useState('#00e0ff');
    const API_KEY = "01553ea3-817e-48b3-b1a5-5a94ff5773a4"
    colorAir = "";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.airvisual.com/v2/city?city=Hanoi&state=Hanoi&country=Vietnam&key=${API_KEY}`);
                const data = response.data;
                const pm25Value = data.data.current.pollution.aqicn;
                setPM25(pm25Value);
                
                if (pm25Value > 150) {
                    colorAir = "#ff6666";
                    setColor(colorAir)
                } else if (pm25Value <= 150 && pm25Value > 100) {
                    colorAir = "#ffbd55";
                    setColor(colorAir)
                }
                else if (pm25Value <= 100 && pm25Value >= 50) {
                    colorAir = "#ffff66";
                    setColor(colorAir)
                } 
                 else if (pm25Value < 50) {
                    colorAir = "#9de24f";
                    setColor(colorAir)
                }
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
                fill={pm25 * 100 / 500}
                arcSweepAngle={180}
                rotation={270}
                tintColor={scolor}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor='#f8fbff'
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5c79ff",

    },
    text1: {
        marginTop: 40,
        fontSize: 20,
        color: "white"
    },
});

export default InforAir;



