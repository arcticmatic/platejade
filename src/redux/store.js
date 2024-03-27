import { configureStore } from '@reduxjs/toolkit';
/* import logger from 'redux-logger'; */
import { setupListeners } from '@reduxjs/toolkit/query';

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
import authSlice from './auth/authSlice';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'role', 'name', 'isLoggedIn'],
};

/* const persistConfig = {
  key: 'contacts',
  storage,
}; */

// export const store = configureStore({
//   reducer: {
//     auth: persistReducer(authPersistConfig, authSlice),
//   },
//   middlewareForLogger,
//   middleware: getDefaultMiddleware => [
//     ...getDefaultMiddleware({ serializableCheck: false }),
//     /* logger, */
//   ],

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
  },
  middlewareForLogger: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    /* logger, */
  ],

  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
