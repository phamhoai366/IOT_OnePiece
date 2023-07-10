import React, { useState, useEffect } from "react";
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { View, Text } from "react-native";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  off,
} from "firebase/database";

const Test = () => {
  const [d, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase(FireBaseConfigAPP);
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data.username);
      console.log("data: ", data);
    });

    // Clean up listener when component unmounts
    return () => {
      off(child(ref(getDatabase(FireBaseConfigAPP))), "value");
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text >{d}</Text>
    </View>
  );
};

export default Test;
