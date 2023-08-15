import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import logo from "../assets/logo.png";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
/*
  useEffect(() => {
    // Load saved login info from storage (if any)
    async function loadLoginInfo() {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");

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
*/


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

    const e = email;
    const p = password;
    console.log(e);
    console.log(p);

    const auth = getAuth(FireBaseConfigAPP);

    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        navigation.navigate("MainDeviceScreen");
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
    navigation.navigate("ForgotPassScreen");
  };

  const handleSignUpPress = () => {
    // Navigate to sign up screen
    // For example:
    navigation.navigate("SignUpScreen");
  };

  const handleLoginFaceBook = () => {};
  const handleLoginGoogle = () => {};
  const handleLoginFaceID = () => {};

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      <Text style={styles.header}>Login</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <View style={styles.rememberLoginContainer}>
        <TouchableOpacity onPress={handleRememberLoginChange}>
          {rememberLogin ? (
            <Image
              style={styles.checkboxIcon}
              source={require("../assets/check.png")}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.checkboxIcon}
              source={require("../assets/icon.png")}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.rememberLoginText}>Remember me</Text>
      </View>
      {loginError && (
        <Text style={styles.error}>Invalid email or password</Text>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLoginPress}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={styles.signUp}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <TouchableOpacity onPress={handleLoginFaceBook}>
          <Image
            style={styles.logingg}
            source={require("../assets/facebook.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginGoogle}>
          <Image
            style={styles.logingg}
            source={require("../assets/search.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginFaceID}>
          <Image
            style={styles.logingg}
            source={require("../assets/face-scan.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
  },
  input: {},
  header: {
    fontSize: 40,
    //color: "rgb(212,240,252)",
    marginBottom: 30,
    fontWeight: "bold",
    //fontFamily:"Arial"
  },
  rememberLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    //marginBottom: 15,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rememberLoginText: {
    //color: "white",
  },
  error: {
    color: "#ff0000",
    marginBottom: 15,
  },
  buttonContainer: {
    backgroundColor: "#3360ff",
    paddingVertical: 10,
    borderRadius: 30,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 15,
    //textDecorationLine: "underline",
    color: "#0000b3",
  },
  signUp: {
    color: "#0000b3",
    marginTop: 15,
    //textDecorationLine: "underline",
  },
  logingg: {
    width: 50,
    height: 50,
    margin: 20,
  },
});

export default LoginScreen;

