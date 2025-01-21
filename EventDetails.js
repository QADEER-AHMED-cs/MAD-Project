import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EventDetails = ({ route }) => {
  const event = route.params?.event;

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event details are unavailable.</Text>
      </View>
    );
  }

  const registerForEvent = () => {
    Alert.alert('Registration Successful', `You have registered for ${event.title}`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>{event.title}</Text>
      </LinearGradient>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>📅 Date: {event.date}</Text>
        <Text style={styles.details}>🕒 Time: {event.time || 'TBD'}</Text>
        <Text style={styles.details}>📍 Venue: {event.venue || 'TBD'}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <TouchableOpacity style={styles.registerButton} onPress={registerForEvent}>
          <Text style={styles.buttonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  details: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
  },
  description: {
    fontSize: 16,
    marginVertical: 15,
    color: '#666',
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#2575fc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default EventDetails;
