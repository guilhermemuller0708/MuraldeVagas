import { createSlice } from '@reduxjs/toolkit';

import { fetchVacancys } from './actions';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  entities: {
    totalCount: 0,
    items: []
  },
  vacancyForEdit: undefined,
  filter: {
    page: 1,
    perPage: 10,
    field: 'area',
    order: 'ASC',
    search: '',
    salary: 2000,
    requirements: []
  },
  error: null
};

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: initialState,
  reducers: {
    setFilters(state, { payload }) {
      state.filter = {
        ...state.filter,
        ...payload
      };
    }
  },
  extraReducers: {
    [fetchVacancys.pending]: (state, action) => {
      state.listLoading = true;
    },
    [fetchVacancys.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.listLoading = false;
    },
    [fetchVacancys.rejected]: (state, action) => {
      state.entities = {
        items: [],
        totalCount: 0
      };
      state.listLoading = false;
    }
  }
});

export const { setFilters } = vacancySlice.actions;

export const actions = {
  fetchVacancys
};
