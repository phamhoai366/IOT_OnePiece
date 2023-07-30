import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TemperatureScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Temperature Screen</Text>
      {/* Add your desired content for the temperature screen */}
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

export default TemperatureScreen;
