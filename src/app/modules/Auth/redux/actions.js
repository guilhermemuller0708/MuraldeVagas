import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './crud';

const loginUser = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await api.login(user);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getUserByToken = createAsyncThunk(
  'auth/user-by-token',
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState();

    try {
      const { data } = await api.userByToken(auth.authToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { loginUser, getUserByToken };
