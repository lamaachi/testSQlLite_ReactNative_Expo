import * as SQLite from 'expo-sqlite'
// import { DB_NAME } from '../utils/variables'


const DB_NAME = 'db';  // Define your database name here

//code for opening the data base
const openDataBase = async () =>{
    const db = await SQLite.openDatabaseSync(DB_NAME)
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
         CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, article TEXT NOT NULL, price INTEGER, imageUrl TEXT);
        `)
    return db
}

//code for retrive all records 
const getAllRecords = async ()=>{
    const db = await openDataBase();
    const allRows = await db.getAllAsync("SELECT * FROM test")
    return allRows;
}

//code fro add new record
const addRecord = async (article, price, imageUrl) => {
    const db = await openDatabase();
    await db.runAsync('INSERT INTO test (article, price, imageUrl) VALUES (?, ?, ?)', [article, price, imageUrl]);
}


//code for delete one record
const deleteRecord = async (id) => {
    const db = await openDatabase();
    await db.runAsync('DELETE FROM test WHERE id = ?', [id]);
};

export { getAllRecords, addRecord, deleteRecord };


