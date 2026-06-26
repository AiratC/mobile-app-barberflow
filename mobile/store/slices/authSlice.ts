import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import { AuthState } from "../../types/auth.types";

const initialState: AuthState = {
   token: null,
   user: null,
   isAuthenticated: false,
   isInitialLoading: true
};


const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      // Вызывается при успешном входе или авто-входе
      setCredentials: (state, action: PayloadAction<{ token: string; user: any }>) => {
         state.token = action.payload.token;
         state.user = action.payload.user;
         state.isAuthenticated = true;
         state.isInitialLoading = false;
      },
      // Вызывается если токена нет или он протух
      setInitializationChecked: (state) => {
         state.isInitialLoading = false;
      },
      // Разлогин
      logout: (state) => {
         state.token = null;
         state.user = null;
         state.isAuthenticated = false;
         state.isInitialLoading = false;
         // Чистим память устройства
         SecureStore.deleteItemAsync('user_token');
      }
   }
});

export const { setCredentials, setInitializationChecked, logout } = authSlice.actions;
export default authSlice.reducer;


