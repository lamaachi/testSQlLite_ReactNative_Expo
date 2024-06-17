import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Page</Text>
      <Text style={styles.content}>
        This is the About page of the application. Here you can provide some information about the app, its purpose, and other relevant details.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default About;
