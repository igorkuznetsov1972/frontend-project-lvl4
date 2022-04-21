import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from '../slices/chatSlice.js';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
  },
});
