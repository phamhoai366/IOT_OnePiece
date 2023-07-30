import * as firebase from 'firebase/app'



var firebaseConfig = {
    apiKey: "AIzaSyCS3ZavFsU23w1pi4ERbjKRYfUfWVsjFQc",
    authDomain: "iotchallenge-7715c.firebaseapp.com",
    databaseURL: "https://iotchallenge-7715c-default-rtdb.firebaseio.com",
    projectId: "iotchallenge-7715c",
    storageBucket: "iotchallenge-7715c.appspot.com",
    messagingSenderId: "571304695719",
    appId: "1:571304695719:web:a04c828c4ecdb2b17f0882",
    measurementId: "G-WJXGQPF0NG",
    serviceAccount: "serviceAccount.json",
};



export const FireBaseConfigAPP=firebase.initializeApp(firebaseConfig);

