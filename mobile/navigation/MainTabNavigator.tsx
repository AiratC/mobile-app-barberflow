import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {

   const handleScreenOptions = ({ route }: { route: RouteProp<any, any> }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }: { focused: boolean, color: string, size: number }) => {
         let iconName: any;
         if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
         } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
         } else if (route.name === 'Recordings') {
            iconName = focused ? 'calendar' : 'calendar-outline'
         };

         return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: '#FFC107',
      tabBarInactiveTintColor: 'gray'

   })
   return (
      <Tab.Navigator
         screenOptions={handleScreenOptions}
      >
         <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Главная' }} />
         <Tab.Screen name='Recordings' component={HomeScreen} options={{ title: 'Записи' }} />
         <Tab.Screen name='Profile' component={HomeScreen} options={{ title: 'Профиль' }} />
      </Tab.Navigator>
   )
}

export default MainTabNavigator
