import { combineReducers } from 'redux';
import { authSlice } from 'app/modules/Auth/redux/slice';
import { boardSlice } from 'app/modules/Vacancy/redux/board/slice';

export const reducers = combineReducers({
  auth: authSlice.reducer,
  board: boardSlice.reducer
});
