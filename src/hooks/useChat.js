import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import {
  addChannel, removeChannel, renameChannel, addMessage,
} from '../components/chat/slices/chatSlice.js';

const useChat = () => {
  const dispatch = useDispatch();
  const { current: socket } = useRef(io());

  useEffect(() => {
    socket.on('newMessage', (message) => dispatch(addMessage(message)));
    socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
    socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
    socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, name })));
  }, []);

  const sendMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      console.log(response.status);
    });
  };
  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      console.log(response.status);
    });
  };
  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      console.log(response.status);
    });
  };
  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      console.log(response.status);
    });
  };
  return {
 sendMessage, addChannel, renameChannel, removeChannel
};
};
export default useChat;
