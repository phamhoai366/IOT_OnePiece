import React from 'react';
import { View } from 'react-native';
import { ProgressCircle } from 'react-native-progress';


const SemiCircleProgress = ({ percent, size, borderWidth, color }) => {
  return (
    <View style={{ width: size, height: size }}>
      <ProgressCircle
        progress={percent / 100}
        size={size}
        thickness={borderWidth}
        showsText={true}
        color={color}
        unfilledColor="transparent"
        direction="clockwise"
        strokeCap="butt"
      />
    </View>
  );
};

export default SemiCircleProgress;