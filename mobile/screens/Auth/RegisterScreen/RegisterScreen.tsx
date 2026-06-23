import React, { useState } from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './RegisterScreen.styles'
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');


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
