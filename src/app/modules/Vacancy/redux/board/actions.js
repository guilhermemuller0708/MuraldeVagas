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

const findAllAreas = async () => {
  try {
    const { data } = await api.findAreas();
    return data;
  } catch (err) {
    return err.response.data;
  }
};

const findOneVacancy = async (vacancyId) => {
  try {
    const { data } = await api.findById(vacancyId);
    return data;
  } catch (err) {
    return err.response.data;
  }
};

const createVacancy = async (vacancy) => {
  try {
    const { data } = await api.createVacancy(vacancy);
    return data;
  } catch (err) {
    return err.response.data;
  }
};

const editVacancy = async (vacancyId, vacancy) => {
  try {
    const { data } = await api.editVacancy(vacancyId, vacancy);
    return data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteVacancyById = async (vacancyId) => {
  try {
    const { data } = await api.deleteVacancy(vacancyId);
    return data;
  } catch (err) {
    return err.response.data;
  }
};

const fetchVacancyById = createAsyncThunk(
  'board/fetch-by-id',
  async (vacancyId, { rejectWithValue }) => {
    try {
      const { data } = await api.findById(vacancyId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchVacancys, fetchVacancyById, findAllVacancy, deleteVacancyById, findAllAreas, createVacancy, findOneVacancy, editVacancy };
