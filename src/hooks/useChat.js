import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  addChannel, removeChannel, renameChannel, addMessage,
} from '../components/chat/slices/chatSlice.js';

export default () => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const { t } = useTranslation();

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
      console.log(response.status);
      if (response.status === 'ok') toast.success(t('channelcreated'));
      else toast.error(t('general error'));
    });
  };
  const editChannel = (id, name) => {
    socketRef.current.emit('renameChannel', { id, name }, (response) => {
      console.log('Channel renamed', response.status);
      if (response.status === 'ok') toast.success(t('channelrenamed'));
      else toast.error(t('general error'));
    });
  };
  const deleteChannel = (id) => {
    socketRef.current.emit('removeChannel', { id }, (response) => {
      console.log('Channel deleted', response.status);
      if (response.status === 'ok') toast.success(t('channeldeleted'));
      else toast.error(t('general error'));
    });
  };
  return {
    sendMessage, newChannel, editChannel, deleteChannel,
  };
};
