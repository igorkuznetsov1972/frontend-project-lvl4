import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  addChannel, removeChannel, renameChannel, addMessage,
} from '../../slices/chat.js';
import { ApiContext } from '../../contexts/index.jsx';

const ApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  socket.on('newMessage', (message) => dispatch(addMessage(message)));
  socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
  socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, name })));

  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };
  const newChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') toast.success(t('channelcreated'));
      else toast.error(t('general_error'));
    });
  };
  const editChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status === 'ok') toast.success(t('channelrenamed'));
      else toast.error(t('general_error'));
    });
  };
  const deleteChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') toast.success(t('channeldeleted'));
      else toast.error(t('general_error'));
    });
  };
  return (
    <ApiContext.Provider value={{
      sendMessage, newChannel, editChannel, deleteChannel,
    }}
    >
      { children }
    </ApiContext.Provider>
  );
};

export default ApiProvider;
