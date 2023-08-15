import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const SettingCard = (props) => {
  return (
    <View style={{ marginBottom: 5 }}>
      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginTop: 15, marginRight: 20 }}
          source={require("../assets/device/user.png")}
        />
        <Text style={{ marginTop: 15, marginRight: 200, fontSize: 16 }}>
          Account
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginRight: 20, marginTop: 15 }}
          source={require("../assets/theme.png")}
        />
        <Text style={{ marginRight: 200, fontSize: 16, marginTop: 15 }}>
          Theme
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginRight: 20, marginTop: 15 }}
          source={require("../assets/verified.png")}
        />
        <Text style={{ marginRight: 200, fontSize: 16, marginTop: 15 }}>
          Security
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginRight: 20, marginTop: 15 }}
          source={require("../assets/device/notification.png")}
        />
        <Text style={{ marginRight: 200, fontSize: 16, marginTop: 15 }}>
          Notification
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginRight: 20, marginTop: 15 }}
          source={require("../assets/system-update.png")}
        />
        <Text style={{ marginRight: 200, fontSize: 16, marginTop: 15 }}>
          Update
        </Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginRight: 20, marginTop: 15 }}
          source={require("../assets/information.png")}
        />
        <Text style={{ marginRight: 200, fontSize: 16, marginTop: 15 }}>
          Information
        </Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image
          style={{ height: 20, width: 20, marginRight: 20, marginTop: 15 }}
          source={require("../assets/device/question.png")}
        />
        <Text style={{ marginRight: 200, fontSize: 16, marginTop: 15 }}>
          Help
        </Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    zIndex:1
  },
});

export default SettingCard;
