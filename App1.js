import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,TextInput,Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

// const blurhash =
//   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
const [data,setData] = useState([])
const [article,setarticle] = useState('')
const [price,setprice] = useState('')
const [image, setImage] = useState(null);


const pickImage = async ()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.All,
    allowsEditing:true,
    aspect:[4,3],
    quality:1
  })
  console.log(result);
  if(!result.canceled){
    setImage(result.assets[0].uri);
  }
}
  const fetchAndSetData= async  (db)=>{
    const allRows = await db.getAllAsync('SELECT * FROM test') 
    setData(allRows);
  } 

  const handleAddRecord = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('db');
      const result = await db.runAsync('INSERT INTO test (article, price,imageUrl) VALUES (?, ?,?)', [article, price,image]);
      console.log('Inserted new record with ID:', result.lastInsertRowId);
      setarticle('');
      setprice('');
      setImage(null)
      fetchAndSetData(db);
    } catch (error) {
      console.log('Error adding record:', error);
    }
  };

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('db');
        // Execute bulk queries
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, article TEXT NOT NULL, price INTEGER, imageUrl TEXT);
          `);
          
        // Get all results as an array of objects
        const allRows = await db.getAllAsync('SELECT * FROM test');
        setData(allRows)
        // console.log(data)
      } catch (error) {
        console.log('Error setting up database:', error);
      }
    };

    setupDatabase();
  }, []);


  const handleDeleteRecord = async (id) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const db = await SQLite.openDatabaseAsync('db');
              await db.runAsync('DELETE FROM test WHERE id = ?', [id]);
              console.log('Deleted record with ID:', id);
              fetchAndSetData(db); // Refresh the data after deletion
            } catch (error) {
              console.log('Error deleting record:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      /> */}
      <Text style={styles.header}>SQLite Data:</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Article: {item.article}</Text>
            <Text style={styles.itemText}>Price: {item.price}</Text>
            {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecord(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={article}
          onChangeText={setarticle}
          placeholder="Enter value"
        />
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setprice}
          placeholder="Enter int value"
          keyboardType="numeric"
        />
        <Button title="Pick an image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        <Button
          title="Add Record"
          onPress={handleAddRecord}
        />
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    marginLeft:20,
    marginRight:20,
    // justifyContent: 'center',
    paddingTop: 50,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginLeft:20,
    marginRight:20,
    borderRadius: 8,
    elevation: 3, // Android shadow effect
    shadowColor: '#000', // iOS shadow properties
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',

  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
