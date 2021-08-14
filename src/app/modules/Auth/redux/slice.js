import { createSlice } from '@reduxjs/toolkit';

import { getUserByToken, loginUser, signUpUser } from './actions';

const initialState = {
  user: undefined,
  authToken: undefined,
  loading: false,
  loginError: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout(state, { payload }) {
      window.localStorage.removeItem('authToken');
      state.authToken = undefined;
      state.user = undefined;
    }
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loginError = undefined;
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log('payload - loginUser', payload);
      state.user = payload;
      window.localStorage.setItem(
        'authToken',
        JSON.stringify({
          token: payload.Authorization
        })
      );
      state.loginError = undefined;
      state.loading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loginError = payload;
      state.loading = false;
    },

    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = false;
    },

    [getUserByToken.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserByToken.fulfilled]: (state, { payload }) => {
      console.log('payload - getUserByToken', payload);
      state.loading = false;
    },
    [getUserByToken.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { logout } = authSlice.actions;

export const actions = {
  loginUser,
  signUpUser,
  getUserByToken
};
