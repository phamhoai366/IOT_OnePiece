import React,{useState} from 'react';
import { View, StyleSheet,Text,PanResponder, Animated,ViewPropTypes } from 'react-native';
import Slider from '@react-native-community/slider';
import ProgressCircle from 'react-native-progress-circle';

const ProgressCircleComponent = ({ progress }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <ProgressCircle
        percent={progress}
        radius={80}
        borderWidth={20}
        color="#00aaff"
        shadowColor="#eaeaea"
        bgColor="#fff"
      >
      <Text>70</Text>
      </ProgressCircle>
    </View>
  );
};

export default function App() {
  const [progress, setProgress] = useState(50);
  const handleProgressChange = (value) => {
    setProgress(value);
  };

  const angle = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      angle.setValue(0);
    },
    onPanResponderMove: Animated.event([null, { dx: angle }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      const progressValue = Math.floor((angle._value / 360) * 360);
      setProgress(progressValue);
    },
  });

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                { rotate: angle.interpolate({ inputRange: [-360, 360], outputRange: ['-360deg', '360deg'] }) },
              ],
            },
          ]}
        />
      </View>
      <ProgressCircleComponent progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00aaff',
  },
});