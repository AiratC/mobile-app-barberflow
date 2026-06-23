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
   title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#d9d7d7',
      marginBottom: 24,
      textAlign: 'center',
   },
   inputContainer: {
      gap: 16,
      marginBottom: 24,
   },
   input: {
      height: 52,
      borderRadius: 7,
      paddingHorizontal: 16,
      fontSize: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF'
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
   registerContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      marginTop: 24,
   },
   registerText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 15
   },
   registerLink: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: 600,
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
      alignItems: 'center',
   }
});

