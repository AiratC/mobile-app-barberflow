import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false // Нам не нужен дефолтный белый заголовок
         }}
      >
         <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
   )
}

export default MainNavigator
