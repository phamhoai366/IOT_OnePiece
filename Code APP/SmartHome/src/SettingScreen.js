import React from "react";
import { View, StyleSheet, StatusBar} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserProfileCard from "../src/UserProfileCard";
import SettingCard from "./SettingCard";

const SettingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <UserProfileCard />
      <SettingCard />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
    marginTop: StatusBar.currentHeight || 0,
  }
});

export default SettingScreen;
