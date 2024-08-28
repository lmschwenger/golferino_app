// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getPlayers } from '../api';

const HomeScreen = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  return (
    <View>
      <Text>Golferino Players</Text>
      {players.map((player) => (
        <Text key={player.id}>{player.first_name} {player.last_name}</Text>
      ))}
      <Button title="Refresh Players" onPress={fetchPlayers} />
    </View>
  );
};

export default HomeScreen;
