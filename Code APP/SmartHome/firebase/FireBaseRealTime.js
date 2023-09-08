import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { Component } from "react";
import { getDatabase, ref, set, onValue, child, get,off } from "firebase/database";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  setDB() {
    const db = getDatabase(FireBaseConfigAPP);
    set(ref(db, "users/lol"), {
      username: "hieu",
    });
    
  }

  getDB() {
    const db = getDatabase(FireBaseConfigAPP);
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data: ", data);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => this.setDB()}>
          <Text>Set</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.getDB()}>
          <Text>Get</Text>
        </TouchableOpacity>
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}
