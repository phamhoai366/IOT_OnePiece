import React, { useState } from "react";
import { View, Text, Switch, StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
const DarkModeScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const navigation = useNavigation();
  const handleGoBack = () => {
    // Quay lại màn hình trước đó
    navigation.goBack();
  };
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Chế độ sáng tối</Text>
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{isDarkMode ? "Tối" : "Sáng"}</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  darkTitle: {
    color: "#ffffff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
});

export default DarkModeScreen;
