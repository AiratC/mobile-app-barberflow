import React from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './LoginScreen.styles'

const LoginScreen = () => {
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
              placeholderTextColor={`#999`}
              keyboardType='email-address'
              autoCapitalize='none'
            />

            {/* Ввод пароля */}
            <TextInput
              style={styles.input}
              placeholder='Введите пароль'
              placeholderTextColor={`#999`}
              secureTextEntry={true}
              autoCapitalize='none'
            />

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
