import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceHolderImage = require('./assets/images/background-image.png');

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddStickers = () => {
    //
  }

  const onSaveImageAsync = async () => {

  }

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    }
    else {
      alert("You did not select any image.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceHolderImage}
          selectedImage={selectedImage}
        />
      </View>

      {
        showAppOptions ?
          (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon='refresh' label='Reset' onPress={onReset} />
                <CircleButton onPress={onAddStickers} />
                <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
              </View>
            </View>
          )
          :
          (
            <View style={styles.footerContainer} >
              <Button label={"Choose a picture"} theme='primary' onPress={imagePicker} />
              <Button label={"Use this picture"} onPress={() => setShowAppOptions(true)} />
            </View>
          )
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#white',
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});