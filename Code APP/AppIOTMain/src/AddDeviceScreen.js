import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const AddDeviceScreen = () => {
  const [deviceName, setDeviceName] = useState("");

  const handleAddButtonPress = () => {
    // Xử lý logic thêm thiết bị vào hệ thống
    // ...
    // Sau khi xử lý thành công, chuyển hướng trở về màn hình trước đó
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Thiết Bị</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên thiết bị"
        value={deviceName}
        onChangeText={(text) => setDeviceName(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddDeviceScreen;
