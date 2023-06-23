import React from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberLogin: false,
      loginError: false
    };
  }

  componentDidMount() {
    // Load saved login info from storage (if any)
    AsyncStorage.getItem('email').then(email => {
      if (email) {
        this.setState({ email });
      }
    });
    AsyncStorage.getItem('password').then(password => {
      if (password) {
        this.setState({ password });
      }
    });
  }

  // load lại đăng nhập nếu đã lưu thông tin đăng nhập trước đó 
  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };
//Xử lí sự kiện khi người dùng thay đổi value
  handleRememberLoginChange = () => {
    this.setState(prevState => ({ rememberLogin: !prevState.rememberLogin }));
  };
//nhớ mã đăng nhập và update state tương ứng
  handleLoginPress = () => {
    const { email, password, rememberLogin } = this.state;

    // Perform login authentication here

    // For example:
    if (email === 'example@mail.com' && password === 'password') {
      this.setState({ loginError: false });

      // Save login info to storage if "remember login" is checked
      if (rememberLogin) {
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);
      } else {
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('password');
      }

      this.props.navigation.navigate('Dashboard'); // Navigate to Dashboard screen
    } else {
      this.setState({ loginError: true });
    }
  };

  handleForgotPasswordPress = () => {
    // Navigate to forgot password screen
    // For example:
    this.props.navigation.navigate('ForgotPassword');
  };

  handleSignUpPress = () => {
    // Navigate to sign up screen
    // For example:
    this.props.navigation.navigate('SignUp');
  };
//khi người dùng quên mật khẩu hoặc đăng ký
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image style={styles.logo} source={require("./assets/smart.png")} resizeMode='contain' />
        <Text style={styles.header}>One Piece</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          secureTextEntry
        />
        <View style={styles.rememberLoginContainer}>
          <TouchableOpacity onPress={this.handleRememberLoginChange}>
            {this.state.rememberLogin ?
              <Image style={styles.checkboxIcon} source={require("./assets/check.png")} resizeMode='contain' /> :
              <Image style={styles.checkboxIcon} source={require("./assets/icon.png")} resizeMode='contain' />}
          </TouchableOpacity>
          <Text style={styles.rememberLoginText}>Remember me</Text>
        </View>
        {this.state.loginError && <Text style={styles.error}>Invalid email or password</Text>}
        <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLoginPress}>
          <Text style={styles.buttonText}>Sign in!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleForgotPasswordPress}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSignUpPress}>
          <Text style={styles.signUp}>Don't have an account? Sign up!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9999',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
   
  },
  header: {
    fontSize: 50,
    color: '#202060',
    marginBottom: 30,
    fontWeight: 'bold',
    //textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    height: 45,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#F5FCFF',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 20
  },
  rememberLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rememberLoginText: {
    color: 'white',
  },
  error: {
    color: '#ff0000',
    marginBottom: 15,
  },
  buttonContainer: {
    backgroundColor: '#202060',
    paddingVertical: 10,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  forgotPassword: {
    color: 'white',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  signUp: {
    color: '#0000b3',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

