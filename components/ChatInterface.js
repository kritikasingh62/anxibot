import { useState } from 'react';
import axios from 'axios';
import {
  ChatContainer,
  MessageInput,
  SendButton,
  MessageList,
  Message,
  Title,
  ClearButton,
  HelpButton
} from './StyledComponents.js';

const ChatInterface = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    const newMessage = { sender: 'user', text: message };
    setChatHistory([...chatHistory, newMessage]);
    const response = await onSendMessage(message);
    setChatHistory([...chatHistory, newMessage, { sender: 'bot', text: response }]);
    setMessage('');
  };

  const handleClearSession = async () => {
    try {
      await axios.get('/api/clear-session');
      setChatHistory([]);
    } catch (error) {
      console.error('Failed to clear session', error);
    }
  };

  const handleFindHelpNearMe = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.post('/api/find-help-near-me', { latitude, longitude });
          const helpMessage = response.data.message;
          setChatHistory([...chatHistory, { sender: 'bot', text: helpMessage }]);
        } catch (error) {
          console.error('Failed to find help', error);
          setChatHistory([...chatHistory, { sender: 'bot', text: 'Failed to find help near you.' }]);
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      setChatHistory([...chatHistory, { sender: 'bot', text: 'Geolocation is not supported by this browser.' }]);
    }
  };

  return (
    <ChatContainer>
      <Title>Chat with AnxiBot</Title>
      <MessageList>
        {chatHistory.map((chat, index) => (
          <Message key={index} sender={chat.sender}>
            {chat.text}
          </Message>
        ))}
      </MessageList>
      <MessageInput
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <SendButton onClick={handleSendMessage}>Send</SendButton>
      <ClearButton onClick={handleClearSession}>Clear</ClearButton>
      <HelpButton onClick={handleFindHelpNearMe}>Find help near me</HelpButton>
    </ChatContainer>
  );
};

export default ChatInterface;
