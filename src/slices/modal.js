/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  new: false,
  rename: false,
  delete: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => { state[payload] = true; },
    hideModal: (state, { payload }) => { state[payload] = false; },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
