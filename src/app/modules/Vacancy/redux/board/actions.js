import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './crud';

const fetchVacancys = createAsyncThunk(
  'board/fetch',
  async (queryParams, { rejectWithValue }) => {
    try {
      const { data } = await api.findAll(queryParams);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const findAllVacancy = async () => {
  try {
    const { data } = await api.findAllWithoutRules();
    return data;
  } catch (err) {
    return err.response.data;
  }
};


export { fetchVacancys, findAllVacancy };
