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
  error: null
};

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: initialState,
  reducers: {
    func(state, { payload }) {}
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

export const { func } = vacancySlice.actions;

export const actions = {
  fetchVacancys
};
