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
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { colors, sizes } from "../theme";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      address: "",
      phone: "",
    };
  }

  handleOnSubmitEmail = () => {
    if (this.state.email === "") {
      console.log("Vui lòng nhập giá trị");
    } else {
      console.log(this.state.email);
    }
  };

  handleOnSubmitForm = () => {
    if (this.state.password === "") {
      console.log("Vui lòng nhập giá trị");
    } else {
      console.log(this.state.password);
      this.Login_Fire_Base();
    }
  };

  Register_Fire_Base() {
    e = this.state.email;
    p = this.state.password;
    console.log(e, p);
    const auth = getAuth(FireBaseConfigAPP);
    createUserWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        Alert.alert(
          "Đăng ký thành công",
          `Đăng ký thành công ${this.state.email}`,
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
            //onSubmitEditing={this.handleOnSubmitEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            //onSubmitEditing={this.handleOnSubmitForm}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
            //onSubmitEditing={this.handleOnSubmitForm}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
            //onSubmitEditing={this.handleOnSubmitForm}
          />
          <TouchableOpacity
            onPress={() => {
              this.Register_Fire_Base();
            }}
            style={styles.button}
          >
            <Text style={styles.button_Text}>Register</Text>
          </TouchableOpacity>
          <Text style={{ left: 155, top: 130, fontSize: 20 }}>Go back</Text>
        </View>
        <View style={styles.foot}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: colors.blue1,
  },
  main: {
    flex: 5,
    paddingHorizontal: 30,
    backgroundColor: colors.blue2,
    zIndex: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    bottom: 30,
    color: colors.text,
  },
  input: {
    top: 35,
    padding: 10,
    margin: 20,
    fontSize: 20,
    borderBottomWidth: 2,
  },
  button: {
    top: 100,
    left: 130,
    backgroundColor: colors.button,
    width: 170,
    borderRadius: 10,
    padding: 15,
    zIndex: 2,
  },
  foot: {
    flex: 2,
    flexDirection: "row",
  },
  button_Text: {
    textAlign: "center",
    fontSize: 20,
  },
});
