import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { ApiContext } from '../../contexts/index.jsx';

const ApiProvider = ({ children, socket }) => {
  const { t } = useTranslation();
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
