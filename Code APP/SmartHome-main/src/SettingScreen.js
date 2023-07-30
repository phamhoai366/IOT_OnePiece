import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserProfileCard from "../src/UserProfileCard";

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleDeviceManagement = () => {
    // Xử lý khi người dùng chọn Quản lý thiết bị
    console.log("Quản lý thiết bị");
    // Chuyển đến màn hình Quản lý thiết bị
    navigation.navigate("MainDeviceScreen");
  };

  const handleNotificationManagement = () => {
    // Xử lý khi người dùng chọn Quản lý thông báo
    console.log("Quản lý thông báo");
    // Chuyển đến màn hình Quản lý thông báo
    navigation.navigate("NotificationScreen");
  };

  const handleLoginManagement = () => {
    // Xử lý khi người dùng chọn Quản lý đăng nhập
    console.log("Quản lý đăng nhập");
    // Chuyển đến màn hình Quản lý đăng nhập
    navigation.navigate("LoginScreen");
  };

  const handleDarkMode = () => {
    // Xử lý khi người dùng chọn Chế độ sáng/tối
    console.log("Chế độ sáng/tối");
    // Chuyển đến màn hình Chế độ sáng/tối
    navigation.navigate("DarkMode");
  };

  const handleHelp = () => {
    // Xử lý khi người dùng chọn Trợ giúp
    console.log("Trợ giúp");
    // Chuyển đến màn hình Trợ giúp
    navigation.navigate("Help");
  };
  const handleAppIntroduction = () => {
    // Xử lý khi người dùng chọn Giới thiệu ứng dụng
    console.log("Giới thiệu ứng dụng");
    // Chuyển đến màn hình Giới thiệu ứng dụng
    navigation.navigate("AppIntroduction");
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <UserProfileCard />
      </View>

      <TouchableOpacity style={styles.section} onPress={handleDeviceManagement}>
        <Text style={styles.sectionTitle}>Quản lý thiết bị</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleNotificationManagement}>
        <Text style={styles.sectionTitle}>Quản lý thông báo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleLoginManagement}>
        <Text style={styles.sectionTitle}>Quản lý đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleDarkMode}>
        <Text style={styles.sectionTitle}>Chế độ sáng/tối</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleHelp}>
        <Text style={styles.sectionTitle}>Trợ giúp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleAppIntroduction}>
        <Text style={styles.sectionTitle}>Giới Thiệu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor:'#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color:'#000000',
    marginTop: 20,
  },
});

export default SettingScreen;
