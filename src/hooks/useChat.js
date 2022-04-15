import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  addChannel, removeChannel, renameChannel, addMessage,
} from '../components/chat/slices/chatSlice.js';

export default () => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('newMessage', (message) => dispatch(addMessage(message)));
    socketRef.current.on('newChannel', (channel) => dispatch(addChannel(channel)));
    socketRef.current.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
    socketRef.current.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, name })));
  }, []);

  const sendMessage = (message) => {
    console.log('Sending new message');
    socketRef.current.emit('newMessage', message, (response) => {
      console.log('New message sent', response.status);
    });
  };
  const newChannel = (name) => {
    socketRef.current.emit('newChannel', { name }, (response) => {
      console.log('New channel added', response.status);
    });
  };
  const editChannel = (id, name) => {
    socketRef.current.emit('renameChannel', { id, name }, (response) => {
      console.log('Channel renamed', response.status);
    });
  };
  const deleteChannel = (id) => {
    socketRef.current.emit('removeChannel', { id }, (response) => {
      console.log('Channel deleted', response.status);
    });
  };
  return {
    sendMessage, newChannel, editChannel, deleteChannel,
  };
};
