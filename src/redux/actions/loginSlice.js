import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    switchLogin: (state) => {
      state.value = !state.value;
    },
  },
});

export const { switchLogin } = loginSlice.actions;

export default loginSlice.reducer;
