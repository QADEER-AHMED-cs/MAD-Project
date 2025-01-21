import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const events = [
  { id: 1, title: 'Sports Tournament', date: '2025-01-15', description: 'Exciting matches.' },
  { id: 2, title: 'Music Festival', date: '2025-01-20', description: 'Live performances.' },
  { id: 3, title: 'Tech Talk', date: '2025-01-25', description: 'Trends in cloud computing.' },
];

const EventList = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext); // Access dark mode state

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('Event Details', { event: item })}
    >
      <LinearGradient
        colors={isDarkMode ? ['#444', '#222'] : ['#6a11cb', '#2575fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <Text style={[styles.eventTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
        <Text style={[styles.eventDate, isDarkMode && styles.darkText]}>{item.date}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkBackground]}>
      {/* Heading */}
      <LinearGradient
        colors={['#000099', '#cc00cc']} // Updated gradient for the heading
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headingContainer}
      >
        <Text style={[styles.heading, isDarkMode && styles.darkText]}>
          University Event Management
        </Text>
      </LinearGradient>

      {/* Event List */}
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#009999',
  },
  listContainer: {
    paddingTop: 10,
  },
  headingContainer: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  heading: {
    fontSize: 28, // Larger font size
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed', // Modern font style
    color: '#fff', // White font color
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5, // Improved spacing for readability
  },
  eventCard: {
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  gradientCard: {
    padding: 25,
    borderRadius: 15,
  },
  eventTitle: {
    fontSize: 22, // Larger and bold font for titles
    fontWeight: '700',
    fontFamily: 'sans-serif-medium', // Medium-weight sans-serif font
    color: '#fff',
    marginBottom: 8,
    textTransform: 'capitalize', // Capitalize each word
    letterSpacing: 0.8,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'sans-serif-light', // Light-weight font for dates
    color: '#f0f0f0',
    marginTop: 5,
    textTransform: 'uppercase', // Dates in uppercase
    letterSpacing: 1,
  },
  darkText: {
    color: '#ccc',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
});

export default EventList;

