import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      phoneNumber: ''
    };
  }

  handleNameChange = (name) => {
    this.setState({ name });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handlePhoneNumberChange = (phoneNumber) => {
    this.setState({ phoneNumber });
  };

  handleSignUpPress = () => {
    // Perform sign up here
  };

  handleSignInPress = () => {
    this.props.navigation.navigate('SignIn'); // Navigate to SignIn screen
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./assets/smart.png")} resizeMode='contain' />
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={this.state.name}
            onChangeText={this.handleNameChange}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={this.state.phoneNumber}
            onChangeText={this.handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={11}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignUpPress}>
          <Text style={styles.buttonText}>Sign up!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSignInPress}>
          <Text style={styles.signIn}>Already have an account? Sign in!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    alignItems: 'center',
    backgroundColor: '#ff9999',
    padding: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -10,
   
  },
  header: {
    fontSize: 40,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: '600',
    color: '#202060',
    marginBottom: 5,
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
    width: '50%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signIn: {
    color: '#0000b3',
    marginTop: 3,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;