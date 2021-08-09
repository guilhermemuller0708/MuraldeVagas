import { createSlice } from '@reduxjs/toolkit';

import { getUserByToken, loginUser } from './actions';

const initialState = {
  user: undefined,
  authToken: undefined,
  loading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout(state, { payload }) {
      state.authToken = undefined;
      state.user = undefined;
    }
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
    },

    [getUserByToken.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserByToken.fulfilled]: (state, { payload }) => {
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
  getUserByToken
};
