import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myConfig from '../configs/myConfig'; // Ensure the path is correct

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${myConfig.BASE_URL}/accounts/login/`, // Ensure this endpoint is correct
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data)
      if (response.status === 200) {
        const { access, refresh } = response.data;
        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
        
        Alert.alert('Login Successful', 'You have been logged in successfully');
        navigation.navigate('Dashboard'); // Redirect to the Dashboard
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      Alert.alert('Login Failed', `Error: ${errorMessage}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
