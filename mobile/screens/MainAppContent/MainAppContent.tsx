import React, { useEffect } from 'react'
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux';
import { RootState } from './../../store/store';
import * as SecureStore from 'expo-secure-store';
import { setCredentials, setInitializationChecked } from '../../store/slices/authSlice';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './MainAppContent.styles';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../../navigation/AuthNavigator';

const MainAppContent = () => {
   const dispatch = useAppDispatch();
   const { isAuthenticated, isInitialLoading } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      const checkToken = async () => {
         try {
            const token = await SecureStore.getItemAsync('user_token');
            
            if (token) {
               // Здесь в идеале сделать легкий запрос на бэкенд /me для проверки валидности токена
               // Для текущего шага просто восстанавливаем сессию:
               dispatch(setCredentials({ token: token, user: null }));
            } else {
               dispatch(setInitializationChecked());
            }
         } catch (error) {
            dispatch(setInitializationChecked());
         }
      };

      checkToken();

   }, [dispatch]);

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
               <AuthNavigator />
            ) : (
               <AuthNavigator />
            )
         }
      </NavigationContainer>
   )
}

export default MainAppContent
