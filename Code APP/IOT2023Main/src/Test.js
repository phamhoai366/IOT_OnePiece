import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const Test = () => {
  const [brightness, setBrightness] = useState(50); // Giá trị ban đầu của độ sáng

  const handleTouchStart = () => {
    // Khi người dùng chạm vào vòng tròn
    setBrightness(100);
  };

  const handleTouchEnd = () => {
    // Khi người dùng rời tay
    setBrightness(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Độ sáng: {brightness}</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handleTouchStart}
        onPressOut={handleTouchEnd}
      >
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: `rgba(255, 255, 255, ${brightness / 100})`,
              transform: [{ scale: brightness / 100 }]
            }
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default Test;
