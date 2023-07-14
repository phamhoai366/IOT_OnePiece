import React, { useState } from "react";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";

const SettingCard = () => {
  return (
    <View style={{marginBottom:5}}>
    <TouchableOpacity style={styles.container}>
      <Image
        style={{ height: 30, width: 30,marginTop:15,marginRight:20 }}
        source={require("../assets/device/user.png")}
      />
      <Text style={{marginTop:15,marginRight:210 }}>Account</Text>
      <Image
        style={{
          height: 30,
          width: 30,
          transform: [{ rotate: "180deg" }],
          marginTop:15,

        }}
        source={require("../assets/device/left.png")}
      />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "90%",
    //backgroundColor: "red",
    borderColor:"black",
    borderBottomWidth:2,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    flexDirection: "row",

  },
});

export default SettingCard;
