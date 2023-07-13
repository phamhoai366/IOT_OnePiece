import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { colors, sizes } from "../theme";

const UserProfileCard = () => {
  const handlePasswordChange = () => {
    // Xử lý khi người dùng chọn Đổi mật khẩu
    console.log("Đổi mật khẩu");
  };

  const handleInfo = () => {
    // Xử lý khi người dùng chọn Thông tin
    console.log("Thông tin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userIcon}></View>
      <View style={styles.userInfo}>
        <Text style={styles.actionText}>Phạm Trung Hiếu</Text>
        <Text >Email</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Text style={styles.actionText}>Thông tin</Text>
          <Text style={styles.actionText}>Đổi mật khẩu</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background3,
    height: 200,
    borderRadius: 20,
    elevation: 10,
    flexDirection: "row",
  },
  userInfo: {
    flex: 2,
    alignItems: "center",
    backgroundColor: colors.background4,
    width: 50,
    height: 150,
    margin: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userIcon: {
    flex: 1,
    width: 50,
    height: 100,
    margin: 10,
    borderRadius: 25,
    backgroundColor: "blue",
  },
  actionButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    margin:20
  },
});

export default UserProfileCard;
