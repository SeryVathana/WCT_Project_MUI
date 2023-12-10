import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './actions/loginSlice';
import userSlice from './actions/userSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    user: userSlice,
  },
});
