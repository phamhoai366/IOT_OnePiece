import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const Help= () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    // Quay lại màn hình trước đó
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trợ giúp</Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Liên hệ:</Text>
        <Text>Email: ka@gmail.com</Text>
        <Text>Hotline: 123456789</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Người sáng lập:</Text>
        <Text>Tên: Nguyễn Văn A</Text>
        <Text>Email: founder@gmail.com</Text>
        <Text>Số điện thoại: 0987654321</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Địa chỉ:</Text>
        <Text>Địa chỉ: công ty ABC</Text>
        <Text>Đường: Xuân Thủy, Quận Cầu Giấy</Text>
        <Text>Thành phố: Hà Nội, Việt Nam</Text>
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
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
});

export default Help;
