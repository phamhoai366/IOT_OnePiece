from keras.models import load_model  # TensorFlow is required for Keras to work
import cv2  # Install opencv-python
import numpy as np
import pyrebase

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
db = firebase.database()

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

model = load_model("keras_model.h5", compile=False)
class_names = open("labels.txt", "r").readlines()


camera = cv2.VideoCapture(0)

while True:
    # Grab the webcamera's image.
    ret, image = camera.read()
    ref = db.child("Nha_A/Room4/Door")
    data = ref.get().val()
    print(data)

    image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)
    a = cv2.resize(image, (500, 500), interpolation=cv2.INTER_AREA)
    cv2.imshow("Webcam", a)
    if data==0:
        image = np.asarray(image, dtype=np.float32).reshape(1, 224, 224, 3)
        image = (image / 127.5) - 1

        prediction = model.predict(image)
        index = np.argmax(prediction)
        class_name = class_names[index]
        print(index)
        if index == 0:
            ref = db.child("Nha_A/Room4")
            d = {
                "Door": 1,
            }
            ref.update(d)

    keyboard_input = cv2.waitKey(1)

    if keyboard_input == 27:
        break

camera.release()
cv2.destroyAllWindows()
