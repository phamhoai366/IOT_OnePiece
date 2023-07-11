import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, sizes } from "../theme";
import UserProfileCard from "./UserProfileCard";

const SettingScreen = () => {
  const handleContactManagement = () => {
    // Xử lý khi người dùng chọn Quản lí danh bạ
    console.log("Quản lí danh bạ");
  };

  const handleDeviceManagement = () => {
    // Xử lý khi người dùng chọn Quản lí thiết bị
    console.log("Quản lí thiết bị");
  };

  const handleNotificationManagement = () => {
    // Xử lý khi người dùng chọn Quản lí thông báo
    console.log("Quản lí thông báo");
  };

  const handleLoginManagement = () => {
    // Xử lý khi người dùng chọn Quản lí đăng nhập
    console.log("Quản lí đăng nhập");
  };

  const handleTwoFactorAuth = () => {
    // Xử lý khi người dùng chọn Bảo mật hai lớp
    console.log("Bảo mật hai lớp");
  };

  const handleDarkMode = () => {
    // Xử lý khi người dùng chọn Chế độ sáng/tối
    console.log("Chế độ sáng/tối");
  };

  const handleHelp = () => {
    // Xử lý khi người dùng chọn Trợ giúp
    console.log("Trợ giúp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}></Text>
      <View style={styles.section}>
        <UserProfileCard />
      </View>

      <TouchableOpacity
        style={styles.section}
        onPress={handleContactManagement}
      >
        <Text style={styles.sectionTitle}>Quản lí danh bạ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleDeviceManagement}>
        <Text style={styles.sectionTitle}>Quản lí thiết bị</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={handleNotificationManagement}
      >
        <Text style={styles.sectionTitle}>Quản lí thông báo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleLoginManagement}>
        <Text style={styles.sectionTitle}>Quản lý đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleTwoFactorAuth}>
        <Text style={styles.sectionTitle}>Bảo mật hai lớp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleDarkMode}>
        <Text style={styles.sectionTitle}>Chế độ sáng/tối</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleHelp}>
        <Text style={styles.sectionTitle}>Trợ giúp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.background2,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SettingScreen;
