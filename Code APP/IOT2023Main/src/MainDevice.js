import React from "react";
import { View, StyleSheet, Text } from "react-native";

const MainDevice = () => {
  return (
    <View style={[{top:100},styles.container]}>
      <Text style={styles.text}>Hello</Text>
      <View style={styles.square}>
        <View style={styles.device}>
          <Text>Đèn</Text>
        </View>
        <View style={styles.device}>
          <Text>Nhiệt độ</Text>
        </View>
        <View style={styles.device}>
          <Text>Đóng/mở cửa</Text>
        </View>
        <View style={styles.device}>
          <Text>Chất lượng không khí</Text>
        </View>
      </View>
      <View style={[{top:-50},styles.square]}>
        <View style={styles.device}>
          <Text>Lượng điện sử dụng</Text>
        </View>
        <View style={styles.device}>
          <Text>Check camera</Text>
        </View>
        <View style={styles.device}>
          <Text>Theme</Text>
        </View>
        <View style={styles.device}>
          <Text>Nâng cao</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  square: {
    flexDirection: "row",
    height:"25%",
    margin: 10,
    alignItems:"center",
  },
  device: {
    backgroundColor: "white",
    height:"55%",
    width:"20%",
    margin: 10,
  },
  text:{
    fontSize:40,
  }
});

export default MainDevice;
