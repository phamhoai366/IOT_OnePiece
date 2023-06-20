import React from 'react';
import {Button} from '@rneui/themed';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const image = require('./assets/background_login.png');

const App = () => (
  <View style={styles.container}>
    <StatusBar style="dark" />
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View

      ></View>
      <View style={styles.login}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.textinput}

          numberOfLines={4}
          maxLength={40}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          placeholder="Đăng nhập"
          //onChangeText={text => onChangeText(text)}
          //value={value}
        />
        <TextInput
          style={styles.textinput}
          numberOfLines={4}
          maxLength={40}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
          returnKeyType='go'
          //onChangeText={setPassworld}
          //value={password}
        />
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'white',
            top: 70,
          }}
          onPress={() => {}}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: 'black',
            }}>
            Sign in
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: 340,
    height: 370,
    backgroundColor: '#000000c0',
    alignItems: 'center',
    bottom: -10,
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  textinput: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderWidth: 5,
    color: 'white',
    width: 200,
    borderColor: 'white',
    fontSize: 15,
    fontFamily: 'Cochin',
    paddingTop: 45,
  },
  login_button: {},
});

export default App;
