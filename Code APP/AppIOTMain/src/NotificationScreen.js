import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const NotificationScreen = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const toggleNotification = () => {
    setIsNotificationVisible(!isNotificationVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleNotification}>
        <Text>Hiển thị thông báo</Text>
      </TouchableOpacity>

      <Modal visible={isNotificationVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Thông báo của bạn</Text>
            <TouchableOpacity onPress={toggleNotification}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notificationContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
  },
});

export default NotificationScreen;
