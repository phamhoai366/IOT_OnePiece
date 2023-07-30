import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [airQuality, setAirQuality] = useState('');
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    // Simulated API call to get air quality data
    fetchAirQualityData()
      .then((data) => {
        setAirQuality(data.airQuality);
        generateRecommendation(data.airQuality);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchAirQualityData = async () => {
    // lấy dữ liệu chất lượng không khí từ API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ airQuality: 'Good' }); // Replace with actual air quality data
      }, 2000);
    });
  };
//nhận vào chất lượng không khí và dựa vào giá trị đó để tạo ra khuyến nghị phù hợp
  const generateRecommendation = (airQuality) => {
    let recommendation = '';

    if (airQuality === 'Good') {
      recommendation = 'The air quality is good. It is safe to engage in outdoor activities.';
    } else if (airQuality === 'Moderate') {
      recommendation =
        'The air quality is moderate. You may consider limiting prolonged outdoor activities.';
    } else if (airQuality === 'Unhealthy') {
      recommendation =
        'The air quality is unhealthy. It is recommended to stay indoors and avoid outdoor activities.';
    } else {
      recommendation = 'Unable to determine air quality. Please try again later.';
    }

    setRecommendation(recommendation);
  };
  //kiểm tra giá trị của airQuality
  const renderAirQualityLogo = () => {
    let imageSource = require('../assets/good.png'); // Default logo for good air quality

    if (airQuality === 'Moderate') {
      imageSource = require('../assets/moderate.png');
    } else if (airQuality === 'Unhealthy') {
      imageSource = require('../assets/unhealthy.png');
    }

    return <Image source={imageSource} style={styles.logo} />;
  };

  const handleDoorOpen = () => {
    console.log('Door open button pressed');
    // Perform actions for door open
  };

  const handleFanSpeedChange = () => {
    console.log('Fan speed button pressed');
    // Perform actions for fan speed change
  };

  const handleMaskOn = () => {
    console.log('Mask on button pressed');
    // Perform actions for mask on
  };

  return (
    <View style={[styles.container, { backgroundColor: '#ffff' }]}>
      <Text style={styles.title}>Air Quality</Text>
      {renderAirQualityLogo()}
      <Text style={styles.airQualityText}>{airQuality}</Text>

      <Text style={styles.recommendation}>{recommendation}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: airQuality !== 'Good' ? '#D3D3D3' : '#FF0000' }]}
          onPress={handleDoorOpen}
          disabled={airQuality !== 'Good'}
        >
          <Icons name="door-open" size={20} color="#ffff" />
          <Text style={styles.buttonText}>Door Open</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: airQuality === 'Unhealthy' ? '#D3D3D3' : '#00FF00' }]}
          onPress={handleFanSpeedChange}
          disabled={airQuality === 'Unhealthy'}
        >
          <Icons name="fan" size={20} color="#ffff" />
          <Text style={styles.buttonText}>Fan Speed</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.button, { backgroundColor: airQuality === 'Good' ? '#D3D3D3' : '#0000FF' }]}
            onPress={handleMaskOn}
            disabled={airQuality === 'Good'}
          >
            <Icon name="user-secret" size={20} color="#ffff" />
            <Text style={styles.buttonText}>Mask On</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderWidth: 3,
      borderRadius: 10,
      borderColor: '#FF8080',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 80,
      marginTop: 1,
    },
    logo: {
      width: 240,
      height: 240,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    airQualityText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    recommendation: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
      marginTop: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#ffff',
      borderWidth: 5,
      borderColor: '#ff8080',
      
      padding: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
      marginBottom: 20,
      marginRight: 10,
    },
    buttonText: {
      marginLeft: 10,
      color: '#000',
    },
  });
  
  export default App;
  
