import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.jpg';
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);



  useEffect(() => {
    // Load saved login info from storage (if any)
    async function loadLoginInfo() {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');

        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadLoginInfo();
  }, []);

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleRememberLoginChange = () => {
    setRememberLogin(!rememberLogin);
  };

  const handleLoginPress = async () => {

        // Navigate to the home screen
      //  navigation.navigate('MainDeviceScreen', { email });

    e = email;
    p = password;
    console.log(e);
    console.log(p);
    const auth = getAuth(FireBaseConfigAPP);

    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        navigation.navigate('MainDeviceScreen');
      })
      
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error");
      });


  };


  const handleForgotPasswordPress = () => {
    // Navigate to forgot password screen
    // For example:
    navigation.navigate('ForgotPassScreen');
  };

  const handleSignUpPress = () => {
    // Navigate to sign up screen
    // For example:
    navigation.navigate('SignUpScreen');
  };

  return (
      <LinearGradient
      colors={['#ffffff', '#ff4d4d']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.8 }}
      style={styles.container}
    >
        <Image style={styles.logo} source={logo} resizeMode='contain' />
        <Text style={styles.header}>One Piece</Text>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <Input
          placeholder='Password'
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <View style={styles.rememberLoginContainer}>
          <TouchableOpacity onPress={handleRememberLoginChange}>
            {rememberLogin ?
              <Image style={styles.checkboxIcon} source={require("../assets/check.png")} resizeMode='contain' /> :
              <Image style={styles.checkboxIcon} source={require("../assets/icon.png")} resizeMode='contain' />}
          </TouchableOpacity>
          <Text style={styles.rememberLoginText}>Remember me</Text>
        </View>
        {loginError && <Text style={styles.error}>Invalid email or password</Text>}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={styles.signUp}>Don't have an account? Sign up!</Text>
        </TouchableOpacity>
      </LinearGradient>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9999',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  header: {
    fontSize: 40,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  rememberLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rememberLoginText: {
    color: 'white',
  },
  error: {
    color: '#ff0000',
    marginBottom: 15,
  },
  buttonContainer: {
    backgroundColor: '#202060',
    paddingVertical: 10,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  forgotPassword: {
    color: 'white',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  signUp: {
    color: '#0000b3',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

