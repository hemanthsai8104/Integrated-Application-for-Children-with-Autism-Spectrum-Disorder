from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app)

cascade_path = os.path.join(os.path.dirname(__file__), 'haarcascade_frontalface_default.xml')

try:
    face_cascade = cv2.CascadeClassifier(cascade_path)
    if face_cascade.empty():
        raise IOError(f"Could not load haarcascade file from {cascade_path}")
except Exception as e:
    print(f"Error loading cascade classifier: {e}")
    face_cascade = None

def predict_emotion(face_image):
    emotions = ["Happy", "Calm", "Surprised", "Thinking"]
    return np.random.choice(emotions)

@app.route('/recognize_emotion', methods=['POST'])
def recognize_emotion():
    if face_cascade is None:
        return jsonify({"error": "Face detection model not loaded"}), 500
    data = request.json
    if 'image' not in data:
        return jsonify({"error": "No image data provided"}), 400
    try:
        image_data = base64.b64decode(data['image'].split(',')[1])
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    except Exception as e:
        return jsonify({"error": f"Invalid image data: {e}"}), 400
    if img is None:
        return jsonify({"error": "Could not decode image"}), 400
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40))
    if len(faces) == 0:
        return jsonify({"emotion": "No Face Detected"})
    (x, y, w, h) = faces[0]
    face_roi = gray[y:y+h, x:x+w]
    emotion = predict_emotion(face_roi)
    return jsonify({"emotion": emotion})

if __name__ == '__main__':
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
