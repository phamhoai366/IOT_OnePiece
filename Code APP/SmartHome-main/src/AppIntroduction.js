import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AppIntroductionScreen = () => {
  const navigation = useNavigation();

  const handleUpdateVersion = () => {
    // Xử lý khi người dùng chọn Cập nhật phiên bản
    console.log("Cập nhật phiên bản");
    // Chuyển đến màn hình Cập nhật phiên bản
    //navigation.navigate("UpdateVersion");
  };

  const handleGoBack = () => {
    // Quay lại màn hình trước đó
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Text style={styles.version}>One Piece</Text>
      <Text style={styles.version}>Phiên bản ứng dụng: 1.0.0</Text>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateVersion}>
        <Text style={styles.updateButtonText}>Cập nhật phiên bản</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  backButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#ff9999',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  version: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#ff9999',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#ff9999',
  },
});

export default AppIntroductionScreen;
