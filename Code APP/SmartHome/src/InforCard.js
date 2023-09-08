import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const InforCard = () => {

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardContainerMain}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={styles.text1}>IoT Challenge 2023</Text>
                        <Text style={styles.text1}>Smart Home</Text>
                        <Text style={styles.text1}>One Piece</Text>
                    </View>
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderColor: "white",
                            borderWidth: 2,
                            borderRadius: 15,
                            backgroundColor: "white"
                        }}
                        source={require("../assets/adaptive-icon.png")}
                    />
                </View>
            </View>
            <View style={styles.cardContainerFoot}>
            <Image
                        style={{
                            width: 25,
                            height: 25,
                            borderColor: "white",
                            borderWidth: 1,
                            borderRadius: 20,
                            backgroundColor: "white",
                        }}
                        source={require("../assets/heart.png")}
                    />
            </View>
        </View>
    );
};

const WeatherCard = () => {
    return <InforCard />;
};
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        elevation: 1,
        
    },
    cardImage: {
        flexDirection: "row",
    },
    cardContainerMain: {
        backgroundColor: "#5c79ff",
        flex: 7,
        height: "100%",
        width: "100%",
        padding: 20,
    },
    cardContainerFoot: {
        flex: 1,
        paddingLeft: "85%",
    },
    text1: {
        margin: 2,
        color: "white",
        fontSize: 20
    },
});

export default InforCard;

