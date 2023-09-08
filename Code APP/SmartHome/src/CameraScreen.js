import React, { useState } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  const [url, setUrl] = useState('');
  const [showWebView, setShowWebView] = useState(false);

  const handleOpenWebView = () => {
    setShowWebView(true);
  };

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: "center", justifyContent: "center" }}>
      
      
      {!showWebView ? (
        <View style={{ alignItems: "center", justifyContent: "center", }}>
          <TextInput
            style={{ width: 300, height: 50, borderColor: 'gray', borderWidth: 1, borderRadius:10, padding:6 }}
            onChangeText={text => setUrl(text)}
            value={url}
            placeholder="http://"
          />
          <TouchableOpacity onPress={handleOpenWebView} style={styles.button}>
            <Text style={styles.text1}>Open</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView source={{ uri: url }} style={{ flex: 1, width: '100%',height:100 }} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#3360ff",
    alignItems: "center", 
    justifyContent: "center" ,
    margin: 30,
    borderRadius:10
  },
  text1: {
    color: "white",
    fontSize: 16
  },
});




