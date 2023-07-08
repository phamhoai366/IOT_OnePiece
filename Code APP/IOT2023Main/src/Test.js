import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FireBaseConfigAPP } from "../firebase/FireBaseConfigAPP";


const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Thực hiện đọc dữ liệu từ Firebase Realtime Database
    const fetchData = async () => {
      try {
        const s = await FireBaseConfigAPP.database().ref('user').on("value", function (snapshot) {
          var users = snapshot.val();
          for (var key in users) {
              if (users.hasOwnProperty(key)) {
                  var user = users[key];
                  console.log(user);
              }
          }
      });
        setData(s);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Data: {data}</Text>
    </View>
  );
};

export default MyComponent;
