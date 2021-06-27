from flask import Flask
from flask_cors import CORS
import face_recognition
import cv2

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def _checkface():
    cap = cv2.VideoCapture(0)

    for x in range(5):
        ret, frame = cap.read()
        # rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2BGRA)
        # cv2.imshow('frame', rgb)
        cv2.waitKey(1)
        # out = cv2.imwrite('user.jpg', frame)
        cv2.imwrite('user.jpg', frame)

    cap.release()
    cv2.destroyAllWindows()

    # david_image = face_recognition.load_image_file("david.jpg")
    # david_face_encoding = face_recognition.face_encodings(david_image)[0]

    mack_image = face_recognition.load_image_file("mack.jpg")
    mack_face_encoding = face_recognition.face_encodings(mack_image)[0]

    mike_image = face_recognition.load_image_file("mike.jpg")
    mike_face_encoding = face_recognition.face_encodings(mike_image)[0]

    user_image = face_recognition.load_image_file("user.jpg")
    try:
        user_face_encoding = face_recognition.face_encodings(user_image)[0]
    except:
        return "no auth"

    # david_face_encoding
    results = face_recognition.compare_faces([mike_face_encoding, mack_face_encoding], user_face_encoding)
    if results[0] or results[1]:
        return "user auth"
    else:
        return "no auth"

if __name__ == '__main__':
    app.run()
