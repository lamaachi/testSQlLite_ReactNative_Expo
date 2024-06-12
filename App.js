import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}
