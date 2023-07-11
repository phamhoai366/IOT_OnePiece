import { Component } from "react";
import React,{ useState }from "react";
import { useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,ScrollView
} from "react-native";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { colors, sizes } from "../theme";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

  }

  
  handleOnSubmitEmail = () => {
    if (this.state.email === '') {
     console.log('Vui lòng nhập giá trị');
    } else {
      console.log(this.state.email);
    }
  };

  handleOnSubmitForm=()=>{
    if (this.state.password === '') {
      console.log('Vui lòng nhập giá trị');
     } else {
       console.log(this.state.password);
       this.Login_Fire_Base()
     }
  };

  Login_Fire_Base() {
    e = this.state.email;
    p = this.state.password;
    console.log(e)
    console.log(p)
    const auth = getAuth(FireBaseConfigAPP);

    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        Alert.alert(
          "Đăng nhập thành công",
          `Đăng nhập thành công ${this.state.email}`,
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 7 }}></View>
        <View style={styles.main}>
          <Text style={styles.title}>Đăng nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            onSubmitEditing={this.handleOnSubmitEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            onSubmitEditing={this.handleOnSubmitForm}
          />
          <TouchableOpacity
            onPress={() => {
              this.Login_Fire_Base();
            }}
            style={styles.button}
          >
            <Text style={styles.button_Text}>Login</Text>
          </TouchableOpacity>
          <Text style={{left:155, top:120, fontSize:20}}>Register</Text>
          <Text style={{left:155, top:120, fontSize:20}}>Forget</Text>
        </View>
        <View style={styles.foot}>
          <View style={styles.footView}></View>
          <View style={styles.footView}></View>
          <View style={styles.footView}></View>
        </View>
      </View>
      </ScrollView>
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
    flex: 4,
    paddingHorizontal: 30,
    backgroundColor: colors.blue2,
    zIndex:2
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    bottom:30,
    color:colors.text
  },
  input: {
    top: 35,
    padding: 10,
    margin: 20,
    fontSize: 20,
    borderBottomWidth: 2,
  },
  button: {
    top:320,
    left: 130,
    backgroundColor: colors.button,
    width: 170,
    borderRadius:10,
    padding: 15,
    position:"absolute",
    zIndex:2
  },
  foot: {
    flex: 3,
    flexDirection: "row",
  },
  button_Text: {
    textAlign: "center",
    fontSize: 20,
  },
  footView:{
    flex: 1,
    backgroundColor: "blue",
    marginTop:180,
    height:100,
    width:80,
    marginLeft:10,
    //borderRadius:10,
  }
  
});
