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
  reducers: {},
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

export const { getChat } = chatSlice.actions;
export { fetchChat };
export default chatSlice.reducer;
