import * as React from 'react';
import { View,StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  const [URL, setURL] = useState();
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0, }}>
      <WebView source={{ uri: 'http://192.168.43.53:4747/video' }} />
    </View>
  );
}







