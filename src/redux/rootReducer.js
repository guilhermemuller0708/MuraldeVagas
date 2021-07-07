import { combineReducers } from 'redux';
import { authSlice } from 'app/modules/Auth/redux/slice';

export const reducers = combineReducers({
  auth: authSlice.reducer
});
