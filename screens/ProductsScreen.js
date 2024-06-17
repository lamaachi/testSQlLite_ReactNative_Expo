import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Alert,Text,Image } from 'react-native';
import { getAllRecords, addRecord, deleteRecord } from '../database/db';
import ImagePickerButton from '../components/ImagePickerButton';
import RecordItem from '../components/RecordItem';
import styles from '../styles/style';
import { useSQLiteContext } from 'expo-sqlite';

const HomeScreen = () => {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);
  const [article, setArticle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const records = await getAllRecords(db);
      setData(records);
    };
    fetchData();
  }, []);

  const handleAddRecord = async () => {
    try {
      await addRecord(article, price, image,db);
      setArticle('');
      setPrice('');
      setImage(null);
      const records = await getAllRecords(db);
      setData(records);
    } catch (error) {
      console.log('Error adding record:', error);
    }
  };

  const handleDeleteRecord = async (id,db) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: async () => {
            await deleteRecord(id,db);
            const records = await getAllRecords();
            setData(records);
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SQLite Data:</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecordItem item={item} onDelete={handleDeleteRecord} />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={article} onChangeText={setArticle} placeholder="Enter article" />
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Enter price" keyboardType="numeric" />
        <ImagePickerButton onPickImage={setImage} />
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        <Button title="Add Record" onPress={handleAddRecord} />
      </View>
    </View>
  );
};

export default HomeScreen;
