import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from '../slices/chatSlice.js';

export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
  },
});
