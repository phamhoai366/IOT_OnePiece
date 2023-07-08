import { Component } from "react";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }


  Login_Fire_Base() {
    e = this.state.email;
    p = this.state.password;
    const auth = getAuth(FireBaseConfigAPP);

    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        Alert.alert("Đăng nhập thành công", `Đăng nhập thành công ${this.state.email}`, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error");
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}></View>
        <View style={styles.main}>
          <Text style={styles.title}>Đăng ký</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <Pressable
            onPress={() => {
              this.Login_Fire_Base();
            }}
            style={styles.button}
          >
            <Text style={styles.button_Text}>Register</Text>
          </Pressable>
        </View>
        <View style={styles.foot}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "yellow"
            }}
          ></View>
          <View
            style={{
              flex: 1,
              //backgroundColor: "green"
            }}
          ></View>
          <View
            style={{
              flex: 1,
              //backgroundColor: "blue"
            }}
          ></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  main: {
    flex: 4,
    paddingHorizontal: 30,
    zIndex: 2,
    height: 400,

    backgroundColor: "red",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    zIndex: 3,
    //color: "green",
    top: -40,
  },
  input: {
    top: 50,
    padding: 10,
    margin: 20,
    fontSize: 20,
    borderBottomWidth: 2,
    //borderColor: "black",
  },
  button: {
    top: 125,
    left: 90,
    backgroundColor: "white",
    width: 200,
    borderWidth: 2,
    padding: 10,
  },
  foot: {
    flex: 3,
    flexDirection: "row",
  },
  button_Text: {
    textAlign: "center",
    fontSize: 20,
  },
});
