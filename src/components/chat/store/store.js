import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from '../slices/chatSlice.js';

const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
  },
});
export default store;
