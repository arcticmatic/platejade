import { createSlice } from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
  user: null,
  role: null,
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(authOperations.register.fulfilled, (state, action) => {
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      //   state.isLoggedIn = true;
      // })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logOut.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.isLoggedIn = false;
        // window.location.reload();
      })
      .addCase(authOperations.fetchCurrentUser.pending, state => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, state => {
        state.isFetchingCurrentUser = false;
      });
  },
});

export default authSlice.reducer;
