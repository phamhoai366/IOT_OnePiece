import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Alert} from 'react-native';
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { colors, sizes } from "../theme";


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSignup = () => {
    // Xử lý logic đăng ký

    e = email;
    p = password;
    console.log(e, p);
    const auth = getAuth(FireBaseConfigAPP);
    createUserWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        console.log("Success");
        const user = userCredential.user;
        Alert.alert(
          "Đăng ký thành công",
          `Đăng ký thành công ${email}`,
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập số nhà"
        onChangeText={(text) => setHouseNumber(text)}
        value={houseNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập ngày sinh"
        onChangeText={(text) => setBirthdate(text)}
        value={birthdate}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <Text>Go to back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signupButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Register;