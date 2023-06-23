import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './components/Block';
import Text from './components/Text';

const colors = {
  white: "#fff",
  black: "#000",
  gray: "#f0f0f0",
  caption: "#bfc3c9",
  active: "#007BFA",
  inactive: "#C5CEE0",
  temperature: "#000000",
  humidity: "#000000",
};

const sizes = {
  base: 16,
  font: 14,
  h1: 36,
  h2: 24,
  h3: 20,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};
const mocks = [
  {
    id: 1,
    type: "lights",
    name: "lights",
    value: "on",
    icon: "lightbulb-outline",
    color: '#00004d',
  },
  {
    id: 2,
    type: "climate",
    name: "AC",
    value: "28",
    icon: "ac-unit",
    color: colors.active,
  },
  {
    id: 3,
    type: "entertainment",
    name: "TV",
    value: "off",
    icon: "tv",
    color: colors.gray,
  },
  {
    id: 4,
    type: "entertainment",
    name: "Speakers",
    value: "12",
    icon: "speaker",
    color: colors.humidity,
  },
  {
    id: 5,
    type: "climate",
    name: "Temperature",
    value: "25",
    color: colors.caption,
  },
  {
    id: 6,
    type: "climate",
    name: "Humidity",
    value: "60",
    color: colors.caption,
  },
];
class Dashboard extends Component {
  state = { devices: mocks };
  //thay doi gia tri cua thiet bi va mau
  toggleDeviceSetting = (key) => {
    const { devices } = this.state;
    const device = devices.find((item) => item.id === key);
    device.value = device.value === "on" ? "off" : "on";
    device.color =
      device.color === colors.active ? colors.inactive : colors.active;
    this.setState({ devices });// cap nhat trang thai
  };

  renderDeviceButtons() {
    const { devices } = this.state;
    return devices.map((device) => {
      const { id, name, type, value, icon, color } = device;
      const isActive = value === "on";
      const iconColor = isActive ? color : colors.caption;
      return (
        <TouchableOpacity
          key={id}
          style={[styles.button, { backgroundColor:'#a3297a'}]}
          onPress={() => this.toggleDeviceSetting(id)}
        >
          <Block center>
            <Icon name={icon} size={sizes.h1} color={iconColor} />
            <Text style={styles.deviceName} size={sizes.h3} color={iconColor}>
              {name}
            </Text>
            <Block row>
              <Text
                style={styles.deviceValue}
                size={sizes.h2}
                color={iconColor}
              >
                {`${value}${type === "climate" ? "°C" : ""}`}
              </Text>
              {type === "climate" && (
                <Text
                  style={styles.deviceType}
                  size={sizes.caption}
                  color={iconColor}
                >
                  {`${type}`}
                </Text>
              )}
            </Block>
          </Block>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const { devices } = this.state;

    return (
      <Block style={styles.dashboard}>
        <Text style={styles.Dash}>Dashboard</Text>
        <Block style={styles.status}>
          <Block style={styles.statusItem}>
            <Text style={styles.statusTitle} size={sizes.caption} color={colors.caption}>
              Temperature
            </Text>
            <Text style={styles.statusValue} size={sizes.h1}>
              {mocks[4].value}°C
            </Text>
          </Block>
          <Block style={styles.statusItem}>
            <Text style={styles.statusTitle} size={sizes.caption} color={colors.caption}>
              Humidity
            </Text>
            <Text style={styles.statusValue} size={sizes.h1}>
              {mocks[5].value}%
            </Text>
          </Block>
        </Block>
        <Text style={styles.Devi}>Device</Text>
        <Block style={styles.container}>
          <Block style={styles.deviceBlock}>
            <Block columm>
              <Block style={styles.deviceFirstLine}>
                <Block style={[styles.deviceItem, { backgroundColor: colors.temperature }]}>
                  <Icon name="lightbulb-outline" size={sizes.h2} color='#ffff80' />
                  <Block>
                    <Text
                      style={styles.deviceTitle}
                      //white
                      size={sizes.caption}
                      color={colors.white}
                    >
                      Lights
                    </Text>
                    <Text style={styles.deviceLight} white size={sizes.h1}>
                      {devices[0].value}
                    </Text>
                  </Block>
                </Block>
                <Block style={[styles.deviceItem, { backgroundColor: colors.active }]}>
                  <Icon name="ac-unit" size={sizes.h2} color={colors.white} />
                  <Block>
                    <Text
                      style={styles.deviceTitle}
                      white
                      size={sizes.caption}
                      color={colors.white}
                    >
                      AC
                    </Text>
                    <Text style={styles.deviceValue} white size={sizes.h1}>
                      {devices[1].value}
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block style={styles.deviceSecondLine}>
                <Block style={[styles.deviceItem, { backgroundColor: colors.gray }]}>
                  <Icon name="tv" size={sizes.h2} color={colors.caption} />
                  <Block>
                    <Text
                      style={styles.deviceTitle}
                      size={sizes.caption}
                      color={colors.caption}
                    >
                      TV
                    </Text>
                    <Text style={styles.deviceValue} size={sizes.h1}>
                      {devices[2].value}
                    </Text>
                  </Block>
                </Block>
                <Block style={[styles.deviceItem, { backgroundColor: colors.humidity }]}>
                  <Icon name="speaker" size={sizes.h2} color={colors.white} />
                  <Block>
                    <Text
                      style={styles.deviceTitle}
                      white
                      size={sizes.caption}
                      color={colors.white}
                    >
                      Speakers
                    </Text>
                    <Text style={styles.deviceValue} white size={sizes.h1}>
                      {devices[3].value}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={{ paddingHorizontal: 15 }}>
              {this.renderDeviceButtons()}
            </Block>
          </ScrollView>
        </Block>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Block center>
              <Icon name="dashboard" size={sizes.h1} color={colors.active} />
              <Text style={{ color: colors.active, fontSize: sizes.caption }}>Dashboard</Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Block center>
              <Icon name="event" size={sizes.h1} color={colors.inactive} />
              <Text style={{ color: colors.inactive, fontSize: sizes.caption }}>Schedule</Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Block center>
              <Icon name="settings" size={sizes.h1} color={colors.inactive} />
              <Text style={{ color: colors.inactive, fontSize: sizes              .caption }}>Settings</Text>
            </Block>
          </TouchableOpacity>
        </View>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: '#ffcccc',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  Dash: {
    fontSize: 26,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  Devi: {
    fontSize: 17,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  status: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 70,
  },
  statusItem: {
    flex: 1,
    height: 130,
    borderRadius: 5,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  statusTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  statusValue: {
    marginTop: 10,
    fontWeight: "bold",
  },
  container: {
    flex: 0.8,
    justifyContent:"space-between",
    backgroundColor: colors.white,
    borderRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  deviceBlock: {
    flex: 0.3,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  deviceFirstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deviceSecondLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deviceItem: {
    flex: 1,
    height: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  deviceTitle: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  deviceLight: {
    marginTop: 10,
    fontWeight: "bold",
  },
  deviceType: {
    marginTop: 25,
  },
  button: {
    width: "100%",
    height: 120,
    borderRadius: 40,
    marginBottom: 5,
  },
  footer: {
    flex: 0.3,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: colors.gray,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: 40,
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Dashboard;


