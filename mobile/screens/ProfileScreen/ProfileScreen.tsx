import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { styles } from './ProfileScreen.styles';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets(); // Получаем динамические отступы

  const [name, setName] = useState('');

  return (
    <View style={[styles.containerProfileScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Профиль</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Имя</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Введите имя"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={() => { }}>
            <Text style={styles.buttonText}>Сохранить</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => dispatch(logout())}
          >
            <Text style={styles.logoutText}>Выйти</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
