import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // import icon từ react-native-vector-icons
import { colors } from "../theme";


const MainDevice = () => {
  return (
    <View style={[{top:100},styles.container]}>
      <Text style={styles.text}>Main</Text>
      <View style={styles.square}>
        <View style={styles.device}>
        <Text>Đèn</Text>
        <Icon name="lamp" size={30} color="#900" />
        </View>
        <View style={styles.device}>
          <Text>Nhiệt độ</Text>
          <Icon name="lamp" size={30} color="#900" />
        </View>
        <View style={styles.device}>
          <Text>Đóng/mở cửa</Text>
          <Icon name="door" size={30} color="#900" />
        </View>
        <View style={styles.device}>
          <Text>Chất lượng không khí</Text>
          <Icon name="air-filter" size={30} color="#900" />
        </View>
      </View>
      <View style={[{top:-50},styles.square]}>
        <View style={styles.device}>
          <Text>Lượng điện sử dụng</Text>
          <Icon name="solar-power" size={30} color="#900" />
        </View>
        <View style={styles.device}>
          <Text>Check camera</Text>
          <Icon name="lamp" size={30} color="#900" />
          
        </View>
        <View style={styles.device}>
          <Text>Theme</Text>
          <Icon name="lamp" size={30} color="#900" />
        </View>
        <View style={styles.device}>
          <Text>Nâng cao</Text>
          <Icon name="lamp" size={30} color="#900" />
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
     borderColor:"black",
    borderWidth:2
  },
  text:{
    fontSize:40,
  }
});

export default MainDevice;
