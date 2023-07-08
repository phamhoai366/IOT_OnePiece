import { Component } from "react";
import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MainDevice from "./MainDevice";
//import Horizontal_ScrollView from "./horizontalScrollView";

const Main = () => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 2, flex: 10, backgroundColor: "red" }}>
        <Text style={{ fontSize: 40 }}>Dash Board</Text>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.box}>
              <Text style={styles.text}>Nhiệt độ thời tiết</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>Số thiết bị đang kết nối</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>3</Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={{ zIndex: 1, flex: 20, backgroundColor: "green" }}>
        <MainDevice />
      </View>
      <View style={{ flex: 2, backgroundColor: "blue", flexDirection: "row" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Text>Main</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "green" }}>
          <Text>Lập lịch</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Text>Trợ lí ảo</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "green" }}>
          <Text>Cài đặt</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  box: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    marginRight: 20,
  },
  scrollview: {
    top: 100,
  },
});

export default Main;
