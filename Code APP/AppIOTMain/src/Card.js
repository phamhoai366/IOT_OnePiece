import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
       source={require('H:/Download/IOT_OnePiece/Code APP/AppIOTMain/assets/icon.png')}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>Card Description</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default Card;


/*


import React from "react";
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import Card from "./Card";
function App() {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
      <Swiper loop={true} autoplay={true} autoplayTimeout={5}>
        <Card />

        <Card />
        <Card />
      </Swiper>
      </View>
      <View style={{flex:1}}></View>
    </View>
  );
}

export default App;


*/
