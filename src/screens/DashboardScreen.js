import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="New Game" onPress={() => Alert.alert('New Game', 'Start a new game!')} />
      <Button title="My Games" onPress={() => Alert.alert('My Games', 'Here are your games.')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
