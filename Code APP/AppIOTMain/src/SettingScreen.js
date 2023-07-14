import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import SettingCard from "./SettingCard";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <SettingCard />
      <SettingCard />
      <SettingCard />
      <SettingCard />
      <SettingCard />
      <TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/log-out.png")}
          />
          <Text>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default SettingScreen;
