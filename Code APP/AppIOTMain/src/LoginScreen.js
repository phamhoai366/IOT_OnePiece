import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet,SafeAreaView,Alert } from 'react-native';
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { colors, sizes } from "../theme";


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    e = email;
    p = password;
    console.log(e)
    console.log(p)
    const auth = getAuth(FireBaseConfigAPP);

    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        Alert.alert(
          "Đăng nhập thành công",
          `Đăng nhập thành công ${email}`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error");
      });
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google
  };

  const handleFaceLogin = () => {
    // Xử lý đăng nhập bằng Khuôn mặt
  };

  const handleForgotPassword = () => {
    // Xử lý quên mật khẩu
  };

  const handleRegister = () => {
    // Xử lý đăng ký
  };

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.forgotRegisterContainer}>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
          style={styles.googleIcon}
          source={require('H:/Download/IOT_OnePiece/Code APP/AppIOTMain/assets/google.png')}
        />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.faceButton} onPress={handleFaceLogin}>
        <Image
          style={styles.faceIcon}
          source={require('H:/Download/IOT_OnePiece/Code APP/AppIOTMain/assets/faceid.png')}
        />
        <Text style={styles.buttonText}>Login with Face ID</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue1,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotRegisterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  forgotPasswordButton: {
    flex: 1,
    marginRight: 5,
  },
  registerButton: {
    flex: 1,
    marginLeft: 5,
    //borderColor: '#f4511e',
    //borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#dd4b39',
    marginBottom: 10,
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  faceButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#4267B2',
    marginBottom: 10,
  },
  faceIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default LoginScreen;
