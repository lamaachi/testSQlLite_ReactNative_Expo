import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginHorizontal: 20,
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
      marginHorizontal: 20,
      borderRadius: 8,
      elevation: 3,
      shadowColor: '#000',
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


export default styles;