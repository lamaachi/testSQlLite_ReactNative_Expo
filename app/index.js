import React from 'react';
import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Page:</Text>
      <Link href="/about" style={styles.link}>Go To About</Link>
      <Link href="/home" style={styles.link}>Go To Home</Link>
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
  link: {
    fontSize: 18,
    color: '#1e90ff',
    marginVertical: 10,
  },
});

export default Index;
