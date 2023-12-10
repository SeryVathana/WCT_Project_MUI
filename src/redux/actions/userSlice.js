import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userId: 1,
    userName: 'Sery Vathana',
    userPfp: 'https://images.pexels.com/photos/783941/pexels-photo-783941.jpeg?auto=compress&cs=tinysrgb&w=800',
    userRole: 'Admin',
  },
  // value: {
  //   userId: 10,
  //   userName: 'Rin Samnang',
  //   userPfp: 'https://images.pexels.com/photos/783941/pexels-photo-783941.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   userRole: 'User',
  // },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
