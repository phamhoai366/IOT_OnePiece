import React from 'react';
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const Gas = () => {
    const navigation = useNavigation();

    const HandleLogo = () => { }
    const HandleQR = () => { 
        navigation.navigate("QR");
        console.log(1) 
    }
    const HandleNotifi = () => { }

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            //marginTop: StatusBar.currentHeight || 0,
        }}>
            <TouchableOpacity onPress={HandleLogo}>
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10
                    }}
                    source={require("../assets/device/user.png")}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={{ marginLeft: 260 }}>
                <TouchableOpacity onPress={HandleQR}>
                    <Image
                        style={{
                            width: 30,
                            height: 30,

                        }}
                        source={require("../assets/device/qr-code.png")}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={HandleNotifi}>
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10
                    }}
                    source={require("../assets/device/notification.png")}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Gas;