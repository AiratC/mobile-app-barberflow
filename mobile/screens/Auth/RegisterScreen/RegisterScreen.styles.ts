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
      backgroundColor: '#1A1A1A',
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12
   },
   buttonText: {
      color: '#FAFAFA',
      fontSize: 16,
      fontWeight: '600'
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
   },
   passwordInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 7,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      height: 52
   },
   passwordInput: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 16,
      fontSize: 21,
      color: '#FFFFFF'
   },
   eyeIcon: {
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center'
   }
});