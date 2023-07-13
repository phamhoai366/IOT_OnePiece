import pyrebase
import cv2

cap = cv2.VideoCapture(0)

firebaseConfig = {
  "apiKey": "AIzaSyAXDfYJ3F-N2C5QuoT4PLQv7xRYU9NoKQc",
  "authDomain": "hieu-6e438.firebaseapp.com",
  "projectId": "hieu-6e438",
  "storageBucket": "hieu-6e438.appspot.com",
  "messagingSenderId": "991666691591",
  "appId": "1:991666691591:web:8aecf9b4d156abaee554a2",
  "measurementId": "G-ES0PWRSHSJ",
  "serviceAccount":"serviceAccount.json",
  "databaseURL":"https://hieu-6e438-default-rtdb.firebaseio.com/"
}

firebase = pyrebase.initialize_app(firebaseConfig)
storage=firebase.storage()

while (1):
  
  ret, frame = cap.read()


  cv2.imwrite("temp.jpg", frame)

  # Gửi ảnh lên Firebase Storage
  storage.child("image/cam.jpg").put("temp.jpg")
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break
  
cap.release()
cv2.destroyAllWindows()


