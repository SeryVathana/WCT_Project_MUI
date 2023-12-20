import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userId: 0,
    userName: 'User',
    userPfp: '',
    userRole: 'user',
  },
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
        userEmail: actions.payload.email,
        userFirstName: actions.payload.firstName,
        userLastName: actions.payload.lastName,
        userBiddingHistory: actions.payload.biddingHistory,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
