import React, { useState } from 'react'
import { ActivityIndicator, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './LoginScreen.styles'
import { Ionicons } from '@expo/vector-icons';
import { useLoginMutation } from '../../../store/services/authApi';
import { setCredentials } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../store/store';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }: any) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const [login, { isLoading: loginLoading, isError: loginError }] = useLoginMutation();

  // Обработчик входа
  const handleClickLogin = async () => {

    if(!email?.trim() || !password?.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка валидации',
        text2: 'Пожалуйста, заполните все поля',
        position: 'top'
      });
      return;
    }
    

    try {
      const response = await login({ email, password }).unwrap();

      // Сохраняем токен в зашифрованное хранилище устройства
      await SecureStore.setItemAsync('user_token', response.token);
      
      // Отправляем данные в Redux
      dispatch(setCredentials({ token: response.token, user: response.user }));

    } catch (error: any) {
      console.log(`Error in login: `, error);

      const errorMessage = error?.data?.message || 'Не удалось связаться с сервером';

      Toast.show({
        type: 'error',
        text1: 'Ошибка авторизации',
        text2: errorMessage,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true
      });
    }
  }

  return (
    <>
      <ImageBackground
        source={require('../../../assets/barber-login-bg.webp')}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Вход в BarberFlow</Text>

          <View style={styles.inputContainer}>

            {/* Ввод почты */}
            <TextInput
              style={styles.input}
              placeholder='example@mail.com'
              placeholderTextColor={`#A0A0A0`}
              keyboardType='email-address'
              autoCapitalize='none'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            {/* Ввод пароля */}
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder='Введите пароль'
                placeholderTextColor={`#A0A0A0`}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize='none'
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text.length === 0) {
                    setIsPasswordVisible(false);
                  }
                }}
              />

              {/* Кнопка иконки глазика */}
              {
                password.length > 0 && (
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color={`#A0A0A0`}
                    />
                  </TouchableOpacity>
                )
              }
            </View>

          </View>

          {/* Кнопка входа */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            disabled={loginLoading}
            onPress={handleClickLogin}
          >
            <Text style={styles.buttonText}>
              { loginLoading ? (
                <ActivityIndicator color={`#FFFFFF`} size={'small'} />
              ) : (
                <Text>Войти</Text>
              ) }
            </Text>
          </TouchableOpacity>

          {/* Блок кнопки регистрации */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Ещё нет аккаунта?</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerLink}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

export default LoginScreen
