import React, { useEffect } from 'react';
import { View } from 'react-native';
import ProductsScreen from '../screens/ProductsScreen';
import { SQLiteProvider } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite'
import { openCurrentDataBase } from '../database/db';

export default function home() {
  useEffect(()=>{
      openCurrentDataBase()
  },[])
  return (
    <View style={{ flex: 1 }}>
      <SQLiteProvider databaseName="webText">
        <ProductsScreen />
      </SQLiteProvider>
    </View>
  );
}
