import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';

function QRScanner() {
  const [imageSource, setImageSource] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();
  }, []);

  const selectImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      setImageSource(uri);
    }
  };

  const handleBarCodeRead = result => {
    // Xử lý kết quả quét mã QR ở đây
    console.log(result.data);
  };

  if (permissionGranted === null) {
    return <View />;
  }

  if (permissionGranted === false) {
    return <Text>No access to camera roll</Text>;
  }

  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image source={{ uri: imageSource }} style={styles.image} resizeMode="contain" />
      ) : (
        <BarCodeScanner
          style={styles.camera}
          onBarCodeScanned={handleBarCodeRead}
        />
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
  camera: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 400,
  },
});

export default QRScanner;