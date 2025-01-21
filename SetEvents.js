import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { EventContext } from './EventContext';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from './ThemeContext'; // Import theme context

const SetEvents = () => {
  const { events } = useContext(EventContext); // Access events from context
  const { isDarkMode } = useTheme(); // Access dark mode state
  const [feedback, setFeedback] = useState({});
  const [rating, setRating] = useState({});
  const [sortBy, setSortBy] = useState('name'); // State for sorting preference

  const submitFeedback = (eventId) => {
    Alert.alert('Feedback Submitted', `Rating: ${rating[eventId]} stars\nComments: ${feedback[eventId]}`);
    setFeedback({ ...feedback, [eventId]: '' });
    setRating({ ...rating, [eventId]: '' });
  };

  const sortEvents = (events) => {
    if (sortBy === 'name') {
      return events.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date') {
      return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return events;
  };

  const renderPastEvent = ({ item }) => (
    <View style={[styles.eventCard, isDarkMode ? styles.darkEventCard : styles.lightEventCard]}>
      <Text style={[styles.eventTitle, isDarkMode ? styles.darkText : styles.lightText]}>{item.title}</Text>
      <Text style={[styles.eventDate, isDarkMode ? styles.darkText : styles.lightText]}>{item.date}</Text>
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Leave a comment"
        value={feedback[item.id]}
        onChangeText={(text) => setFeedback({ ...feedback, [item.id]: text })}
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Rate (1-5)"
        keyboardType="numeric"
        value={rating[item.id]}
        onChangeText={(text) => setRating({ ...rating, [item.id]: text })}
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      />
      <TouchableOpacity style={styles.submitButton} onPress={() => submitFeedback(item.id)}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );

  const sortedEvents = sortEvents(events);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.sortContainer, isDarkMode ? styles.darkSortContainer : styles.lightSortContainer]}>
        <Text style={[styles.sortText, isDarkMode ? styles.darkText : styles.lightText]}>Sort By:</Text>
        <Picker
          selectedValue={sortBy}
          style={[styles.picker, isDarkMode ? styles.darkPicker : styles.lightPicker]}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Event Name" value="name" />
          <Picker.Item label="Event Date" value="date" />
        </Picker>
      </View>
      <FlatList
        data={sortedEvents}
        renderItem={renderPastEvent}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f7f8fa',
    padding: 15,
  },
  darkContainer: {
    backgroundColor: '#222',
    padding: 15,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  lightSortContainer: {
    backgroundColor: '#fff',
  },
  darkSortContainer: {
    backgroundColor: '#333',
  },
  sortText: {
    fontSize: 16,
    fontWeight: '600',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  picker: {
    flex: 1,
    height: 50,
    marginLeft: 15,
    borderRadius: 5,
    paddingLeft: 10,
  },
  lightPicker: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  darkPicker: {
    backgroundColor: '#444',
    borderColor: '#666',
  },
  eventCard: {
    padding: 20,
    marginVertical: 15,
    borderRadius: 12,
  },
  lightEventCard: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  darkEventCard: {
    backgroundColor: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#444',
    borderColor: '#777',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SetEvents;
