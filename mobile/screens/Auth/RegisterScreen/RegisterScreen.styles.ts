import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
   backgroundImage: {
      flex: 1
   },
   overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      justifyContent: 'center',
      paddingHorizontal: 24,
   },
   registerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 32,
      textAlign: 'center'
   },
   inputContainer: {
      gap: 16,
      marginBottom: 24
   },
   input: {
      height: 52,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 7,
      paddingHorizontal: 16,
      fontSize: 21,
      color: '#FFFFFF',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
   },
   button: {
      height: 52,
      backgroundColor: '#ffffff',
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8
   },
   buttonText: {
      color: '#1A1A1A',
      fontSize: 19,
      fontWeight: 'bold'
   },
   loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      marginTop: 24,
   },
   loginText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 18,
   },
   loginLink: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      textDecorationLine: 'underline'
   }
});