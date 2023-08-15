import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import AnimatedCircularProgress from "react-native-progress-circle";

const TemperatureScreen = () => {
  const progress = 75;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedCircularProgress
          size={120} // Kích thước của hình tròn (đơn vị pixel)
          width={10} // Độ dày của đường viền (đơn vị pixel)
          fill={60} // Giá trị phần trăm muốn điền vào hình tròn
          tintColor="#00e0ff" // Màu sắc của phần đã được điền (mặc định là xanh dương)
          backgroundColor="#3d5875" // Màu sắc nền của hình tròn (mặc định là xám đậm)
          rotation={0} // Góc quay của hình tròn (đơn vị độ)
          lineCap="round" // Kiểu đầu mút cho đường viền (round hoặc square)
        />
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3360ff",
          padding: 5,
        }}
      >
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: StatusBar.currentHeight || 0,
  },
});

export default TemperatureScreen;
