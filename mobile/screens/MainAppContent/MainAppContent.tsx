import React, { useEffect } from 'react'
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux';
import { RootState } from './../../store/store';
import * as SecureStore from 'expo-secure-store';
import { logout, setCredentials, setInitializationChecked } from '../../store/slices/authSlice';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './MainAppContent.styles';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../../navigation/AuthNavigator';
import MainNavigator from '../../navigation/MainNavigator';
import { useLazyGetProfileQuery } from '../../store/services/authApi';

const MainAppContent = () => {
   const dispatch = useAppDispatch();
   const { isAuthenticated, isInitialLoading } = useSelector((state: RootState) => state.auth);

   // Получаем функцию-триггер для безопасного запроса профиля с сервера
   const [triggerGetProfile] = useLazyGetProfileQuery();

   useEffect(() => {
      const checkToken = async () => {
         try {
            const token = await SecureStore.getItemAsync('user_token');

            if (token) {
               // 1. Временно даем токен для prepareHeaders
               dispatch(setCredentials({ token: token, user: null }));

               // 2. Запрашиваем профиль
               const response = await triggerGetProfile().unwrap();

               // 3. Достаем объект пользователя из ответа бэкенда { user, success }
               if (response?.success && response?.user) {
                  dispatch(setCredentials({ token, user: response.user }));
               } else {
                  dispatch(logout());
               }
            }
         } catch (error) {
            dispatch(logout());
         }
      };

      checkToken();

   }, [dispatch, triggerGetProfile]);

   // Пока приложение проверяет наличие токена в памяти устройства, показываем главный лоадер по центру экрана
   if (isInitialLoading) {
      return (
         <View style={styles.mainIndicatorContainer}>
            <ActivityIndicator size={'large'} color={`#FFFFFF`} />
         </View>
      )
   }

   return (
      <NavigationContainer>
         {/* Если авторизован — показываем основной навигатор (например, MainNavigator), иначе — AuthNavigator */}
         {
            isAuthenticated ? (
               // Сюда позже добавим твой HomeScreen / MainNavigator
               // Пока оставим AuthNavigator для тестов, либо создай заглушку
               <MainNavigator />
            ) : (
               <AuthNavigator />
            )
         }
      </NavigationContainer>
   )
}

export default MainAppContent
