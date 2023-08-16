import * as React from 'react';
import { View,StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0, }}>
      <WebView source={{ uri: 'http://10.90.98.160:4747/video' }} />
    </View>
  );
}