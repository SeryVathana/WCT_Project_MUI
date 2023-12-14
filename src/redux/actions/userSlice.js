import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userId: 0,
    userName: 'User',
    userPfp: '',
    userRole: 'user',
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
  reducers: {
    setUser: (state, actions) => {
      state.value = {
        userId: actions.payload.id,
        userName: actions.payload.firstName + ' ' + actions.payload.lastName,
        userPfp: actions.payload.pfImgURL,
        userRole: actions.payload.role,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
