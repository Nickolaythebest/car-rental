import { configureStore } from "@reduxjs/toolkit";
import carsReducer from './cars/carsSlice.js';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const carsPersistConfig = {
  key: 'cars',
  storage,
};

const persistedCarsReducer = persistReducer(carsPersistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer, // ✅ теперь с persist
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
