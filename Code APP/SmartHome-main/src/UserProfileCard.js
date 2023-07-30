import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserProfileCard = ({ name, email }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Xử lý khi người dùng chọn Đăng xuất
    console.log("Đăng xuất");
    // Chuyển đến màn hình đăng nhập
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userIcon}>
        <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Nguyen Kim Anh</Text>
        <Text style>ka@gmail.com</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: '#ffcccc',
    height: 200,
    borderRadius: 20,
    elevation: 10,
    flexDirection: "row",
  },
  userInfo: {
    flex: 1,
    alignItems: "center",
    backgroundColor:'#ffffff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#000000',
  },
  userIcon: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,
    backgroundColor: '#ff9999',
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  logoutButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserProfileCard;
