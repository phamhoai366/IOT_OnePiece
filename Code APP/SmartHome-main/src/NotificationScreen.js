import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const navigation = useNavigation();

  const toggleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  const handleGoBack = () => {
    // Quay lại màn hình trước đó
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="blue" />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lý thông báo</Text>
      
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationLabel}>Thông báo</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
        />
      </View>

      {isNotificationEnabled ? (
        <Text style={styles.notificationMessage}>
          Bật thông báo để nhận các cảnh báo và tin tức mới nhất về hệ thống Smart Home của bạn.
        </Text>
      ) : (
        <Text style={styles.notificationMessage}>Thông báo đã được tắt.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  notificationLabel: {
    marginRight: 10,
    fontSize: 18,
  },
  notificationMessage: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
});

export default NotificationScreen;
