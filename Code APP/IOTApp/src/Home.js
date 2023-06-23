import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Switch
} from 'react-native';
import lightIcon from './assets/light.png';
import acIcon from './assets/ac.jpg';
import doorIcon from './assets/door.png';
import tvIcon from './assets/tv.jpg';
import fireIcon from './assets/fire.jpg';
import houseIcon from './assets/home.png';

// Simulated sensor data source
const Sensor = {
  getData() {
    // Simulate fetching data from sensor
    const data = {
      temperature: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
      humidity: Math.floor(Math.random() * 70) + 30
    };
    return new Promise(resolve => setTimeout(() => resolve(data), 1000));
  }
};

const App = () => {
  const [isLightsOn, setLights] = useState(false);
  const [isAcOn, setAc] = useState(false);
  const [isDoorOpen, setDoor] = useState(false);
  const [isTvOn, setTv] = useState(false);
  const [isFireAlertOn, setFireAlert] = useState(false);
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');

  const toggleLights = () => setLights(prevState => !prevState);
  const toggleAc = () => setAc(prevState => !prevState);
  const toggleDoor = () => setDoor(prevState => !prevState);
  const toggleTv = () => setTv(prevState => !prevState);
  const toggleFireAlert = () => setFireAlert(prevState => !prevState);

  useEffect(() => {
    const interval = setInterval(() => {
      Sensor.getData().then(data => {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.icon} source={houseIcon} />
        <Text style={styles.title}>SmartHome</Text>
      </View>
      <View style={styles.sensorData}>
        <Text style={styles.sensorTitle}>Sensor Data</Text>
        <Text style={styles.sensorItem}>Temperature: {temperature}°C</Text>
        <Text style={styles.sensorItem}>Humidity: {humidity}%</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={toggleLights}>
          <Image
            style={[styles.buttonIcon, isLightsOn && styles.buttonIconOn]}
            source={lightIcon}
          />
          <Text style={styles.buttonText}>Lights</Text>
          <Switch value={isLightsOn} onValueChange={toggleLights} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleAc}>
          <Image
            style={[styles.buttonIcon, isAcOn && styles.buttonIconOn]}
            source={acIcon}
          />
          <Text style={styles.buttonText}>Air Conditioning</Text>
          <Switch value={isAcOn} onValueChange={toggleAc} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleDoor}>
          <Image
            style={[styles.buttonIcon, isDoorOpen && styles.buttonIconOn]}
            source={doorIcon}
          />
          <Text style={styles.buttonText}>Door</Text>
          <Switch value={isDoorOpen} onValueChange={toggleDoor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleTv}>
          <Image
            style={[styles.buttonIcon, isTvOn && styles.buttonIconOn]}
            source={tvIcon}
          />
          <Text style={styles.buttonText}>TV</Text>
          <Switch value={isTvOn} onValueChange={toggleTv} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleFireAlert}>
          <Image
            style={[styles.buttonIcon, isFireAlertOn && styles.buttonIconOn]}
            source={fireIcon}
          />
          <Text style={styles.buttonText}>Fire Alert</Text>
          <Switch value={isFireAlertOn} onValueChange={toggleFireAlert} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#85a3e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttons: {
    flex: 1,
    width: '120%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 25,
  },
  buttonIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  buttonIconOn: {
    opacity: 1,
  },
  buttonText: {
    fontSize: 14,
    marginTop: -3,
    marginBottom: -15,
    textAlign: 'center',
    maxWidth: '80%',
  },
  sensorData: {
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    alignItems: 'flex-start',
  },
  sensorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sensorItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
