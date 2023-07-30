import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import smart from '../assets/smart.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const handleSignUpPress = async () => {
    try {
      const response = await fetch('http://192.168.1.117:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber
        }),
      });

      if (response.ok) {
        console.log('Signup successful');
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        // Navigate to the login screen
        navigation.navigate('LoginScreen');
      } else {
        console.error('Failed to signup');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={smart} resizeMode='contain' />
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={handleNameChange}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          maxLength={11}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUpPress}>
        <Text style={styles.buttonText}>Sign up!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignInPress}>
        <Text style={styles.signIn}>Already have an account? Sign in!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9999',
    padding: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -10,
   
  },
  header: {
    fontSize: 40,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: '600',
    color: '#202060',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    backgroundColor: '#202060',
    paddingVertical: 10,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signIn: {
    color: '#0000b3',
    marginTop: 3,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
