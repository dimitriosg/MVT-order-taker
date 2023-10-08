// src/redux/store.js
import { configureStore, combineReducers, getDefaultMiddleware  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage

import authReducer from '../slices/authSlice.js';
import roleSwitchReducer from '../slices/roleSwitchSlice.js';
import dashboardReducer from '../slices/dashSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  roleSwitch: roleSwitchReducer,
  dashboard: dashboardReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // optional: whitelist or blacklist reducers
  // whitelist: ['someReducer'],
  // blacklist: ['anotherReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST']
    }
  }),
});

let persistor = persistStore(store);

export { store, persistor };