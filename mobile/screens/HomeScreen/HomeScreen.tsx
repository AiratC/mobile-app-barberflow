import React from 'react'
import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './HomeScreen.styles';

const HomeScreen = () => {
   const dispatch = useAppDispatch();
   // Вытащим данные пользователя из стора, чтобы отобразить на экране
   const { user } = useSelector((state: RootState) => state.auth);

   const handleClickLogout = () => {
      // Наш экшен logout сам очистит Redux-стейт и сотрет токен из SecureStore
      dispatch(logout());
   };

   return (
      <View style={styles.homeScreenContainer}>
         <Text style={styles.title}>Добро пожаловать в BarberFlow!</Text>

         {/* Отобразим email пользователя, если он прилетел с бэкенда */}
         <Text style={styles.subtitle}>
            Вы вошли как: {user?.email || 'Пользователь'}
         </Text>

         <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleClickLogout}
            activeOpacity={0.7}
         >
            <Text style={styles.buttonText}>Выйти из аккаунта</Text>
         </TouchableOpacity>
      </View>
   )
}

export default HomeScreen
