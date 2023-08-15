import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet,StatusBar } from "react-native";

const HistoryScreen = () => {
  const [history, setHistory] = useState([
    { id: 1, action: "Bật đèn phòng khách", time: "2023-08-05 09:30" },
    { id: 2, action: "Tắt đèn phòng khách", time: "2023-08-05 15:45" },
    { id: 3, action: "Mở cửa lúc ", time: "2023-08-05 18:20" },
    { id: 4, action: "Bật đèn ngủ", time: "2023-08-05 21:10" },
    { id: 5, action: "Tắt đèn ngủ", time: "2023-08-05 15:45" },
    { id: 6, action: "Mở cửa lúc ", time: "2023-08-06 18:20" },
    { id: 7, action: "Đóng cửa lúc", time: "2023-08-06 21:10" },
  ]);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.action}>{item.action}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử hoạt động</Text>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.historyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyList: {
    width: "100%",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  action: {
    flex: 1,
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: "#666666",
  },
});

export default HistoryScreen;
