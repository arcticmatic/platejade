import { createSlice } from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
  user: null,
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
        console.log(action.payload);
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logOut.fulfilled, state => {
        state.user = { email: null };
        state.token = null;
        state.isLoggedIn = false;
        window.location.reload();
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
