import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { EventContext } from './EventContext';
import { useTheme } from './ThemeContext'; // Import theme context

const OrganizeEvent = () => {
  const { addEvent } = useContext(EventContext); // Access addEvent from context
  const { isDarkMode } = useTheme(); // Access dark mode state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleAddEvent = () => {
    if (title.trim() && date.trim()) {
      addEvent({ title, date, feedback: '' });
      Alert.alert('Success', 'Event added successfully!');
      setTitle('');
      setDate('');
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Event Title"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Event Date (YYYY-MM-DD)"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Event" onPress={handleAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  lightInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#555',
    borderColor: '#777',
    color: '#fff',
  },
});

export default OrganizeEvent;
