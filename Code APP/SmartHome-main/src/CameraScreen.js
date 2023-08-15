import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text, Image ,StatusBar} from 'react-native';
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";
import {getStorage, ref, getDownloadURL } from'firebase/storage';


export default function CameraScreen() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storageRef = getStorage(FireBaseConfigAPP)
    //const imageRef =ref(storageRef, 'images/2.jpg');
    getDownloadURL(ref(storageRef, 'images/2.jpg'))
    .then((url) => {
     console.log(url)
     setImageUrl(url)
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <View style={styles.container}>
    <Image source={{ uri: imageUrl }} style={styles.img} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  img:{
    width: 350, 
    height: 400,
    borderWidth:2,
    borderRadius:10
  }
});