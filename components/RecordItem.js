import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/style';

const RecordItem = ({ item, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Article: {item.article}</Text>
      <Text style={styles.itemText}>Price: {item.price}</Text>
      {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordItem;
