import React from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './RegisterScreen.styles'

const RegisterScreen = () => {
  return (
    <>
      <ImageBackground
        source={require(`../../../assets/barber-register-bg.webp`)}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        {/* Контейнер с контентом инпутов и текста */}
        <View style={styles.overlay}>
          {/* Заголовок */}
          <Text style={styles.registerTitle}>Регистрация</Text>

          <View style={styles.inputContainer}>
            {/* Ввод имени */}
            <TextInput
              style={styles.input}
              placeholder='Имя'
              placeholderTextColor={`#A0A0A0`}
              autoCapitalize='words'
            />

            {/* Ввод почты */}
            <TextInput
              style={styles.input}
              placeholder='example@gmail.com'
              placeholderTextColor={`#A0A0A0`}
              keyboardType='email-address'
              autoCapitalize='none'
            />

            {/* Ввод пароля */}
            <TextInput
              style={styles.input}
              placeholder='password'
              placeholderTextColor={`#A0A0A0`}
              secureTextEntry={true}
              autoCapitalize='none'
            />

            {/* Кнопка регистрации */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Создать аккаунт</Text>
            </TouchableOpacity>

            {/* Ссылка на вход */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Уже есть аккаунт?</Text>
              <TouchableOpacity
              >
                <Text style={styles.loginLink}>Войти</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </>
  )
}

export default RegisterScreen
