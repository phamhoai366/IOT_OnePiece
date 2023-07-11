import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { colors } from "../theme";

const Chart = () => {
  const [activeTab, setActiveTab] = useState("day");
  const data = {
    day: {
      labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
      datasets: [
        {
          data: [0.5, 1, 1.5, 2, 1, 1, 0.5],
        },
      ],
    },
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [6, 7, 5, 8, 6.5, 9, 10.5],
        },
      ],
    },
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [120, 140, 135, 150, 145, 160, 155, 170, 165, 180, 175, 190],
        },
      ],
    },
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getLowestConsumption = () => {
    const lowestValue = Math.min(...data[activeTab].datasets[0].data);
    return lowestValue;
  };

  const getHighestConsumption = () => {
    const highestValue = Math.max(...data[activeTab].datasets[0].data);
    return highestValue;
  };

  const getAverageConsumption = () => {
    const averageValue =
      data[activeTab].datasets[0].data.reduce((a, b) => a + b, 0) /
      data[activeTab].datasets[0].data.length;
    return averageValue.toFixed(2);
  };

  const renderChart = () => {
    if (activeTab === "year") {
      return (
        <BarChart
          data={data[activeTab]}
          width={400}
          height={400}
          chartConfig={{
            backgroundGradientFrom: "#DAFFFB",
            backgroundGradientTo: "#C1ECE4",
            color: (opacity = 1) => `rgba(10, 100, 255, ${opacity})`,
            strokeWidth: 50,
            barPercentage: 0.5, // Độ rộng của các cột chỉ chiếm 50% trên trục x
            barRadius: 4, // Độ cong nhẹ của các cột
          }}
          style={styles.chart}
        />
      );
    } else {
      return (
        <LineChart
          data={data[activeTab]}
          width={400}
          height={400}
          chartConfig={{
            backgroundGradientFrom: "#DAFFFB",
            backgroundGradientTo: "#C1ECE4",
            color: (opacity = 1) => `rgba(10, 100, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          bezier
          style={styles.chart}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "day" && styles.activeTabItem]}
          onPress={() => handleTabChange("day")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "day" && styles.activeTabText,
            ]}
          >
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "week" && styles.activeTabItem]}
          onPress={() => handleTabChange("week")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "week" && styles.activeTabText,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "year" && styles.activeTabItem]}
          onPress={() => handleTabChange("year")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "year" && styles.activeTabText,
            ]}
          >
            Year
          </Text>
        </TouchableOpacity>
      </View>

      {renderChart()}

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Lowest Consumption: {getLowestConsumption()}
        </Text>
        <Text style={styles.statsText}>
          Highest Consumption: {getHighestConsumption()}
        </Text>
        <Text style={styles.statsText}>
          Average Consumption: {getAverageConsumption()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.blue1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#000066",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: -30,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 3,
    borderColor: "#000066",
    borderRadius: 8,
    marginRight: 10,
  },
  activeTabItem: {
    backgroundColor: "#000066",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "#FFF",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 20,
  },
  statsContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000066",
  },
});

export default Chart;
