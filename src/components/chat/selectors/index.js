import { createSelector } from '@reduxjs/toolkit';

export const getModalState = (state) => state.modal;
export const getfetchStatus = (state) => state.chat.status;
export const getChannels = (state) => state.chat.channels;
export const getCurrentChannel = (state) => state.chat.currentChannelId;
export const getCurrentChannelMessages = createSelector(
  (state) => state.chat.messages,
  (state) => state.chat.currentChannelId,
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);
