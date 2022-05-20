/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = 1;

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: defaultChannel,
  status: 'pending',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getServerState: (state, { payload }) => {
      const {
        messages, channels, currentChannelId, status,
      } = payload;
      state.currentChannelId = currentChannelId;
      state.channels = channels;
      state.messages = messages;
      state.status = status;
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      const channel = payload;
      state.channels.push(channel);
    },
    removeChannel: (state, { payload }) => {
      const channelId = Number(payload);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
      state.currentChannelId = defaultChannel;
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channelId = Number(id);
      const channel = state.channels.find((c) => c.id === channelId);
      if (!channel) return;
      channel.name = name;
    },
    addMessage: (state, { payload }) => {
      const message = payload;
      state.messages.push(message);
    },
  },
});

export const {
  getChat,
  changeCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
  getServerState,
} = chatSlice.actions;

export default chatSlice.reducer;
