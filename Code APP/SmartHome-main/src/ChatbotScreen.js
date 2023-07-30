import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleUserResponse = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    const userMessage = newMessages[0].text.toLowerCase();

    if (userMessage.includes('bật đèn') || userMessage.includes('tắt đèn')) {
      const room = userMessage.includes('phòng') ? getRoom(userMessage) : null;

      if (room) {
        const lightState = userMessage.includes('bật đèn') ? 'on' : 'off';
        sendLightControlRequest(room, lightState)
          .then((response) => {
            const replyMessage = createReplyMessage(response.message);
            setMessages((prevMessages) => GiftedChat.append(prevMessages, [replyMessage]));
          })
          .catch((error) => {
            console.error('Lỗi:', error);
          });
      } else {
        const replyMessage = createReplyMessage('Xin lỗi, tôi không hiểu phòng bạn muốn bật đèn.');
        setMessages((prevMessages) => GiftedChat.append(prevMessages, [replyMessage]));
      }
    } else if (userMessage.includes('mở cửa') || userMessage.includes('đóng cửa')) {
      const door = userMessage.includes('cửa') ? getDoor(userMessage) : null;

      if (door) {
        const doorState = userMessage.includes('mở cửa') ? 'open' : 'close';
        sendDoorControlRequest(door, doorState)
          .then((response) => {
            const replyMessage = createReplyMessage(response.message);
            setMessages((prevMessages) => GiftedChat.append(prevMessages, [replyMessage]));
          })
          .catch((error) => {
            console.error('Lỗi:', error);
          });
      } else {
        const replyMessage = createReplyMessage('Xin lỗi, tôi không hiểu cửa bạn muốn mở.');
        setMessages((prevMessages) => GiftedChat.append(prevMessages, [replyMessage]));
      }
    } else {
      const replyMessage = createReplyMessage('Xin lỗi, tôi không hiểu yêu cầu của bạn.');
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [replyMessage]));
    }
  };

  const getRoom = (text) => {
    const rooms = ['phòng khách', 'phòng ngủ', 'phòng bếp', 'phòng làm việc'];
    for (let i = 0; i < rooms.length; i++) {
      if (text.includes(rooms[i])) {
        return rooms[i];
      }
    }
    return null;
  };

  const getDoor = (text) => {
    const doors = ['cửa chính'];
    for (let i = 0; i < doors.length; i++) {
      if (text.includes(doors[i])) {
        return doors[i];
      }
    }
    return null;
  };

  const sendLightControlRequest = (room, state) => {
    // Simulated API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'on') {
          resolve({ message: `Đèn trong ${room} đã được bật.` });
        } else {
          resolve({ message: `Đèn trong ${room} đã được tắt.` });
        }
      }, 2000);
    });
  };

  const sendDoorControlRequest = (door, state) => {
    // Simulated API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'open') {
          resolve({ message: `Cửa ${door} đã được mở.` });
        } else {
          resolve({ message: `Cửa ${door} đã được đóng.` });
        }
      }, 2000);
    });
  };

  const createReplyMessage = (text) => {
    return {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chatbot',
      },
    };
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleUserResponse(newMessages)}
        user={{
          _id: 1,
          name: 'User',
        }}
        placeholder="Nhập tin nhắn của bạn..."
        renderUsernameOnMessage
        showAvatarForEveryMessage
        timeFormat="HH:mm"
        isTyping
        renderAvatarOnTop
        scrollToBottom
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chatbot;
