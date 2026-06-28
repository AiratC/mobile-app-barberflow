import React, { useEffect, useRef } from 'react'
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux';
import { RootState } from './../../store/store';
import * as SecureStore from 'expo-secure-store';
import { logout, setCredentials, setInitializationChecked } from '../../store/slices/authSlice';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { styles } from './MainAppContent.styles';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../../navigation/AuthNavigator';
import MainTabNavigator from '../../navigation/MainTabNavigator';
import { useLazyGetProfileQuery } from '../../store/services/profileApi';

const MainAppContent = () => {
   const dispatch = useAppDispatch();
   const { isAuthenticated, isInitialLoading } = useSelector((state: RootState) => state.auth);

   // Реф, чтобы гарантировать выполнение проверки строго ОДИН раз при старте приложения
   const isCheckedRef = useRef(false);

   const [triggerGetProfile] = useLazyGetProfileQuery();

   useEffect(() => {
      // Если проверка уже запущена или выполнена — игнорируем повторные вызовы useEffect
      if (isCheckedRef.current) return;
      isCheckedRef.current = true;

      const checkToken = async () => {
         try {
            const token = await SecureStore.getItemAsync('user_token');

            if (token) {
               // Сначала временно прокидываем токен в стейт, чтобы RTK Query прикрепил его к заголовку Auth
               dispatch(setCredentials({ token, user: null }));

               // Делаем запрос профиля
               const userResponse = await triggerGetProfile().unwrap();

               // Сохраняем и токен, и полученного юзера
               dispatch(setCredentials({ token, user: userResponse.user || userResponse }));

            } else {
               dispatch(logout());
            }
         } catch (error) {
            console.error("❌ [CHECK_TOKEN] Критическая ошибка при проверке токена:", error);
            dispatch(logout());
         } finally {
            // Обязательно выключаем глобальный лоадер загрузки
            dispatch(setInitializationChecked());
         }
      };

      checkToken();
   }, [dispatch, triggerGetProfile]);

   if (isInitialLoading) {
      return (
         <View style={styles.mainIndicatorContainer}>
            <ActivityIndicator size={'large'} color={`#FFFFFF`} />
         </View>
      )
   }

   return (
      <NavigationContainer>
         <StatusBar barStyle="light-content"/>
         {isAuthenticated ? <MainTabNavigator/> : <AuthNavigator />}
      </NavigationContainer>
   )
}

export default MainAppContent;