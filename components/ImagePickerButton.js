import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/style';

const ImagePickerButton = ({ onPickImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      onPickImage(result.assets[0].uri);
    }
  };

  return <Button title="Pick an image" onPress={pickImage} />;
};

export default ImagePickerButton;
