import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: ''
    };
  }

  handlePhoneNumberChange = (phoneNumber) => {
    this.setState({ phoneNumber });
  };

  handleSendCodePress = () => {
    // Perform send code here
  };

  handleBackPress = () => {
    this.props.navigation.goBack(); // Navigate back to previous screen
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/smart.png')} resizeMode='contain' />
        <Text style={styles.header}>Forgot Password</Text>
        <Text style={styles.subheader}>Enter your phone number to receive a password reset code.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={this.state.phoneNumber}
            onChangeText={this.handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={11}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSendCodePress}>
          <Text style={styles.buttonText}>Send Code!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleBackPress}>
          <Text style={styles.back}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    marginTop: 30,
   
  },
  header: {
    fontSize: 40,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  subheader: {
    fontSize: 16,
    color: '#202060',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
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
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  back: {
    color: '#0000b3',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
