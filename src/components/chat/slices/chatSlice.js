/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../../routes.js';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: '',
  status: 'pending',
};
const authorization = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

const fetchChat = createAsyncThunk('chat/fetchChat', async () => {
  const response = await axios.get(routes.chatPath(), { headers: { Authorization: `Bearer ${authorization}` } });
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      const channel = payload;
      state.channels.push(channel);
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      const channelId = Number(id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
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
  extraReducers: {
    [fetchChat.fulfilled]: (state, { payload }) => {
      const { messages, channels, currentChannelId } = payload;
      state.currentChannelId = currentChannelId;
      state.channels = channels;
      state.messages = messages;
      state.status = 'fulfilled';
    },
    [fetchChat.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});

export const {
  getChat, changeCurrentChannel, addChannel, removeChannel, renameChannel, addMessage,
} = chatSlice.actions;
export { fetchChat };
export default chatSlice.reducer;
