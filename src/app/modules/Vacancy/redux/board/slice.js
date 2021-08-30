import { createSlice } from '@reduxjs/toolkit';

import {
  fetchVacancyById,
  fetchVacancys,
  favoriteVacancy,
  disfavorVacancy,
  fetchVacancysFavorites
} from './actions';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  entities: {
    totalCount: 0,
    items: []
  },
  vacanciesFavorites: [],
  vacancyForEdit: undefined,
  vacancyForView: undefined,
  filter: {
    page: 1,
    perPage: 10,
    field: 'titulo',
    order: 'ASC',
    search: '',
    salary: 0,
    requirements: []
  },
  error: null
};

export const boardSlice = createSlice({
  name: 'board',
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
      state.listLoading = false;
      state.entities.items = payload.content;
      state.entities.totalCount = payload.totalPages;
    },
    [fetchVacancys.rejected]: (state, action) => {
      state.entities = {
        items: [],
        totalCount: 0
      };
      state.listLoading = false;
    },

    [fetchVacancyById.pending]: (state, action) => {
      state.actionsLoading = true;
      state.vacancyForView = undefined;
    },
    [fetchVacancyById.fulfilled]: (state, { payload }) => {
      state.vacancyForView = payload;
      state.actionsLoading = false;
    },
    [fetchVacancyById.rejected]: (state, action) => {
      state.vacancyForView = undefined;
      state.actionsLoading = false;
    },

    [favoriteVacancy.pending]: (state, action) => {
      state.actionsLoading = true;
    },
    [favoriteVacancy.fulfilled]: (state, { payload }) => {
      state.actionsLoading = false;
    },
    [favoriteVacancy.rejected]: (state, action) => {
      state.actionsLoading = false;
    },

    [disfavorVacancy.pending]: (state, action) => {
      state.actionsLoading = true;
    },
    [disfavorVacancy.fulfilled]: (state, { payload }) => {
      state.actionsLoading = false;
    },
    [disfavorVacancy.rejected]: (state, action) => {
      state.actionsLoading = false;
    },

    [fetchVacancysFavorites.pending]: (state, action) => {
      state.actionsLoading = true;
    },
    [fetchVacancysFavorites.fulfilled]: (state, { payload = [] }) => {
      let vacancies = state.entities.items;

      if (payload.length === 0) {
        vacancies = vacancies.map((item) => {
          return {
            ...item,
            isFavorite: false
          };
        });
      } else {
        vacancies = vacancies.map((item) => {
          return {
            ...item,
            isFavorite: false
          };
        });
        state.entities.items = vacancies;

        payload.forEach((item) => {
          const vacancieIndex = vacancies.findIndex(
            (vacancy) => parseInt(vacancy.id) === parseInt(item.id)
          );

          vacancies[vacancieIndex] = {
            ...vacancies[vacancieIndex],
            isFavorite: true
          };
        });
      }

      state.entities.items = vacancies;
      state.actionsLoading = false;
    },
    [fetchVacancysFavorites.rejected]: (state, action) => {
      state.actionsLoading = false;
    }
  }
});

export const { setFilters } = boardSlice.actions;

export const actions = {
  fetchVacancys,
  fetchVacancyById,
  favoriteVacancy,
  disfavorVacancy,
  fetchVacancysFavorites
};
