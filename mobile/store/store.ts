import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { baseApi } from './api/baseApi';
import authReducer from './slices/authSlice'

export const store = configureStore({
   reducer: {
      // Добавляем редьюсер для нашего API
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer
   },
   // Middleware нужен для кэширования и работы RTK Query
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

