import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Camera Screen</Text>
      {/* Add your camera-related content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
