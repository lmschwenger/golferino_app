import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker'; // Install this package
import myConfig from '../configs/myConfig';

const API_URL = myConfig.BASE_URL;

export default function NewGameScreen({ navigation }) {
  const [golfcourses, setGolfcourses] = useState([]);
  const [selectedGolfcourse, setSelectedGolfcourse] = useState(null);
  const [datePlayed, setDatePlayed] = useState(new Date()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Fetch golf courses
    axios.get(`${API_URL}/golfcourses/get_all`)
      .then(response => {
        const golfcourseOptions = response.data.data.map(golfcourse => ({
          label: golfcourse.name, // Adjust this based on the actual response structure
          value: golfcourse.golfcourseid,
        }));
        setGolfcourses(golfcourseOptions);
      })
      .catch(error => {
        console.error('Error fetching golf courses:', error);
      });
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePlayed;
    setShowDatePicker(false);
    setDatePlayed(currentDate);
  };

  const handleNewGame = () => {
    if (selectedGolfcourse) {
      const formattedDate = datePlayed.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      console.log(selectedGolfcourse)
      console.log(formattedDate)
      axios.post(`${API_URL}/rounds/create`, {
        dateplayed: formattedDate,
        golfcourseid: selectedGolfcourse,
      })
      .then(response => {
        Alert.alert('Success', 'New game created successfully!');
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.error('Error creating new game:', error);
        Alert.alert('Error', 'Failed to create new game.');
      });
    } else {
      Alert.alert('Validation Error', 'Please select a golf course.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>New Game</Text>

      <Text style={{ marginVertical: 8 }}>Select Golf Course</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select a golf course...', value: null }}
        items={golfcourses}
        onValueChange={(value) => setSelectedGolfcourse(value)}
        value={selectedGolfcourse}
      />

      <Text style={{ marginVertical: 8 }}>Select Date Played</Text>
      <Button title="Choose Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={datePlayed}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text>Selected Date: {datePlayed.toDateString()}</Text>

      <Button
        title="Create Game"
        onPress={handleNewGame}
      />
    </View>
  );
}
