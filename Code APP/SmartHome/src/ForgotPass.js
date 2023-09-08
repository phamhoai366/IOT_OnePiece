import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import smart from '../assets/smart.png';

const ForgotPassScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const handleResetPasswordPress = async () => {
    if (validateInput(email, newPassword)) {
      try {
        const requestBody = {
          email: email,
          newPassword: newPassword,
        };
  
        const response = await fetch('http://192.168.1.117:3000/resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.message === 'Lấy lại mật khẩu thành công') {
            // Hiển thị thông báo thành công
            alert('Lấy lại mật khẩu thành công');
            // Chuyển hướng đến màn hình Đăng nhập sau khi đặt lại mật khẩu thành công
            navigation.navigate('LoginScreen');
          } else {
            // Hiển thị thông báo lỗi hoặc phản hồi từ API cho người dùng
            alert('Lỗi: ' + data.error);
          }
        } else {
          console.error('Lỗi:', response.status);
          alert('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.');
        }
      } catch (error) {
        // Xử lý lỗi trong quá trình gửi yêu cầu đến API
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.');
      }
    } else {
      // Hiển thị thông báo lỗi hoặc phản hồi về việc kiểm tra hợp lệ cho người dùng
      alert('Email hoặc mật khẩu mới không hợp lệ');
    }
  };
  
  const validateInput = (email, newPassword) => {
    // Thực hiện kiểm tra tính hợp lệ của email và mật khẩu mới
    // Trả về true nếu hợp lệ, ngược lại trả về false
  
    // Kiểm tra email có đúng định dạng hay không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return false;
    }
  
    // Kiểm tra mật khẩu mới có ít nhất 6 ký tự
    if (!newPassword || newPassword.length < 6) {
      return false;
    }
  
    return true;
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={smart} resizeMode='contain' />
      <Text style={styles.header}>Quên mật khẩu</Text>
      <Text style={styles.subheader}>
        Nhập email của bạn để nhận mã đặt lại mật khẩu.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleResetPasswordPress}>
        <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  header: {
    fontSize: 40,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    backgroundColor: '#3360ff',
    paddingVertical: 10,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPassScreen;
