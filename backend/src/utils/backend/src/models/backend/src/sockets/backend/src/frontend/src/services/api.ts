import React, { useEffect, useState } from 'react';
import { socket, joinRoom, sendMessage } from '../services/api';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const Chat = () => {
  const roomId = 'room1';
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    joinRoom(roomId);
    socket.on('receiveMessage', (msg) => setMessages(prev => [...prev, msg]));
    return () => socket.off('receiveMessage');
  }, []);

  const handleSend = (content: string) => {
    sendMessage(roomId, 'user1', content);
  };

  return (
    <div className="p-4">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
