import { configureStore } from '@reduxjs/toolkit';
import certificationReducer from './certificationSlice';

export const store = configureStore({
  reducer: {
    certification: certificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;