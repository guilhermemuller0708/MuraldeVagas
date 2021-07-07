import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { reducers } from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authToken']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export { store };
