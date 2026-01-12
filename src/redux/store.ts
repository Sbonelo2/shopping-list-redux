import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './shoppingSlice';

const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
