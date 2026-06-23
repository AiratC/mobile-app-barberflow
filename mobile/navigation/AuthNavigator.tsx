import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';

// Создаем объект стека
const Stack = createStackNavigator();

const AuthNavigator = () => {
   return (
      <Stack.Navigator
         initialRouteName='Login'
         screenOptions={{
            headerShown: false
         }}
      >
         {/* Объявляем наши экраны и даем им уникальные имена (name) */}
         <Stack.Screen name='Login' component={LoginScreen} />
         <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
   )
}

export default AuthNavigator
