import pyrebase
import cv2

cap = cv2.VideoCapture(0)

firebaseConfig = {
    "apiKey": "AIzaSyCS3ZavFsU23w1pi4ERbjKRYfUfWVsjFQc",
    "authDomain": "iotchallenge-7715c.firebaseapp.com",
    "databaseURL": "https://iotchallenge-7715c-default-rtdb.firebaseio.com",
    "projectId": "iotchallenge-7715c",
    "storageBucket": "iotchallenge-7715c.appspot.com",
    "messagingSenderId": "571304695719",
    "appId": "1:571304695719:web:a04c828c4ecdb2b17f0882",
    "measurementId": "G-WJXGQPF0NG",
    "serviceAccount": "serviceAccount.json",
}

firebase = pyrebase.initialize_app(firebaseConfig)
storage=firebase.storage()

while (1):
  
  ret, frame = cap.read()


  cv2.imwrite("temp.jpg", frame)

  # Gửi ảnh lên Firebase Storage
  storage.child("images/2.jpg").put("temp.jpg")
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break
  
cap.release()
cv2.destroyAllWindows()


