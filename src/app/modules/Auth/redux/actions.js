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

const signUpUser = createAsyncThunk(
  'auth/signUp',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(user);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getUserByToken = createAsyncThunk(
  'auth/user-by-token',
  async (authToken, { rejectWithValue, getState }) => {
    try {
      const { data } = await api.userByToken(authToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getUserById = createAsyncThunk(
  'auth/user-by-id',
  async (user, { rejectWithValue, getState }) => {
    try {
      const { data } = await api.userById(user);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { loginUser, signUpUser, getUserByToken, getUserById };
