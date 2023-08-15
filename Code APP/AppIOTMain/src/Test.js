import React from 'react';
import { View ,StyleSheet} from 'react-native';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';


const SemiCircleProgressBar = ({ percentage }) => {
  const radius = 100;
  const strokeWidth = 10;
  const progress = (percentage * 180) / 100;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 180) * circumference;

  return (
    <View>
      <Svg width={radius * 2} height={radius + strokeWidth} viewBox={`0 0 ${radius * 2} ${radius + strokeWidth}`}>
        <Path
          stroke="#E1E7ED"
          strokeWidth={strokeWidth}
          fill="transparent"
          d={`M ${radius},${radius + strokeWidth / 2}
              A ${radius},${radius} 0 ${progress > 180 ? '1' : '0'} 1 ${Math.cos(progress) * radius + radius},${Math.sin(progress) * radius + radius}`}
        />
        <Path
          stroke="#007AFF"
          strokeWidth={strokeWidth}
          fill="transparent"
          d={`M ${radius},${radius + strokeWidth / 2}
              A ${radius},${radius} 0 ${progress > 180 ? '1' : '0'} 1 ${Math.cos(offset) * radius + radius},${Math.sin(offset) * radius + radius}`}
        />
      </Svg>
    </View>
  );
};

const Test = () => {
  return (
    <View style={styles.container}>
      <SemiCircleProgressBar percentage={0} />
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


export default Test