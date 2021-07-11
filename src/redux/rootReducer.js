import { combineReducers } from 'redux';
import { authSlice } from 'app/modules/Auth/redux/slice';
import { vacancySlice } from 'app/modules/Vacancy/redux/vacancy/slice';

export const reducers = combineReducers({
  auth: authSlice.reducer,
  vacancy: vacancySlice.reducer
});
