import axios from 'axios';
import ChatInterface from '../components/ChatInterface';
import cookie from 'js-cookie';
import React from 'react';

axios.defaults.withCredentials = true;

const HomePage = () => {
  const handleSendMessage = async (message) => {
    const response = await axios.post('/api/chat', { message }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.get('session-id')}` // Assuming session-id is stored in cookies
      }
    });
    return response.data.message;
  };

  return (
    <div>
      <h1>Chat with AnxiBot</h1>
      <ChatInterface onSendMessage={handleSendMessage} />
    </div>
  );
};

export default HomePage;
