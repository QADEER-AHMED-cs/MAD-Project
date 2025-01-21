import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const FeedbackForm = () => {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const submitFeedback = () => {
    if (rating && comments) {
      Alert.alert('Feedback Submitted', `Rating: ${rating}\nComments: ${comments}`);
      setRating('');
      setComments('');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rate (1-5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        style={styles.input}
        placeholder="Comments"
        value={comments}
        onChangeText={setComments}
      />
      <Button title="Submit Feedback" onPress={submitFeedback} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default FeedbackForm;
