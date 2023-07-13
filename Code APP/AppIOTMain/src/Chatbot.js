import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleUserResponse = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    // Xử lý logic liên quan đến gửi tin nhắn của người dùng tại đây
    //console.log(handleUserResponse)
    // Khởi tạo phản hồi từ chatbot
    const replyMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: 'Phản hồi',
      createdAt: new Date(),
      user: {
        _id: 2, // ID của chatbot
        name: 'Chatbot',
      },
    };
    
    // Thêm tin nhắn phản hồi vàho danh sách tin nắn
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [replyMessage]));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleUserResponse(newMessages)}
      user={{
        _id: 1, // ID của người dùng
        name: 'Người dùng',
      }}
    />
  );
};

export default Chatbot;