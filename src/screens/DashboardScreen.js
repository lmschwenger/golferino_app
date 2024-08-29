import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken'); // Correct the key to 'accessToken'
      await AsyncStorage.removeItem('refreshToken'); // Also remove refresh token if used
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Error', 'An error occurred while logging out.'); // Use Alert to show an error message
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Dashboard</Text>

      <Button 
        title="New Game" 
        onPress={() => navigation.navigate('NewGameScreen')} // Navigate to NewGameScreen
      />

      <Button 
        title="My Games" 
        onPress={() => Alert.alert('My Games', 'Here are your games.')} // Use Alert to show a message
      />

      <Button 
        title="Logout" 
        onPress={handleLogout} 
      />
    </View>
  );
}