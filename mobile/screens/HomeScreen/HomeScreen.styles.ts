import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
   homeScreenContainer: {
      flex: 1,
      backgroundColor: '#121212', // Темная тема в стиле BarberFlow
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 10,
      textAlign: 'center',
   },
   subtitle: {
      fontSize: 16,
      color: '#A0A0A0',
      marginBottom: 40,
   },
   logoutButton: {
      backgroundColor: '#E53935', // Красная кнопка для выхода
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      width: '100%',
      maxHeight: 52,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
   },
});