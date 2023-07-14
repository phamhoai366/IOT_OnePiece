import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../theme';
const Led = () => {
  const [brightnessValues, setBrightnessValues] = useState({
    livingRoom: 0,
    bedRoom: 0,
    kitchen: 0,
    workRoom: 0
  });

  const updateBrightness = (room, brightness) => {
    // Update the brightness value for the selected room
    console.log('Room:', room, 'Brightness:', brightness);
    setBrightnessValues((prevValues) => ({
      ...prevValues,
      [room]: brightness
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.frame}>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/device/led-light.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.roomContainer}>
            <Text>Living Room</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={brightnessValues.livingRoom}
              onValueChange={(value) => updateBrightness('livingRoom', value)}
            />
          </View>

          <View style={styles.roomContainer}>
            <Text>Bed Room</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={brightnessValues.bedRoom}
              onValueChange={(value) => updateBrightness('bedRoom', value)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.roomContainer}>
            <Text>Kitchen</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={brightnessValues.kitchen}
              onValueChange={(value) => updateBrightness('kitchen', value)}
            />
          </View>

          <View style={styles.roomContainer}>
            <Text>Work Room</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={brightnessValues.workRoom}
              onValueChange={(value) => updateBrightness('workRoom', value)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue1,
    padding: 20,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  frame: {
    flex: 1,
    borderWidth: 10,
    borderColor:  "white",
    borderRadius: 10,
    padding: 30,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  roomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor:  "white",
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.blue1,
  },
});

export default Led;