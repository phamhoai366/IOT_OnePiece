import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

function MediaViewer() {
  const [imageSource, setImageSource] = useState(null);

  const selectImage = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.uri) {
        setImageSource(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageSource && (
        <Image source={{ uri: imageSource }} style={styles.image} resizeMode="contain" />
      )}
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
});

export default MediaViewer;