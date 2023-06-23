import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
      this.headerRef.bounceIn(1500)
      this.props.navigation.navigate('LoginScreen');
    }, 3000);
  }

  render() {
    return (
      <LinearGradient
        colors={['#ffffff', '#ff4d4d']}
        start={[0.0, 0.0]}
        end={[1.0, 1.0]}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.jpg')}
            style={styles.logo}
            resizeMode='contain' 
          />
          <Animatable.Text animation="bounceIn" iterationCount={1} style={styles.header}>ONE PIECE</Animatable.Text>
        </View>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 250,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    elevation: 5,
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 15, /* Đặt border radius cho image */
  },

  header: {
    fontSize: 35,
    color: '#00004d',
    marginBottom: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Arial', 

  },
  
  loading: {
    marginTop: 2,
  },
});

export default SplashScreen;
