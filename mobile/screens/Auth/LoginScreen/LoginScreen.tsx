import React, { useState } from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './LoginScreen.styles'
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

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
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>

          {/* Блок кнопки регистрации */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Ещё нет аккаунта?</Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

export default LoginScreen
