from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import os
import numpy as np
import face_recognition

app = Flask(__name__)
CORS(app)

@app.route('/capture-image', methods=['POST'])
def capture_image():
    cap = None
    try:
        # Access the camera
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            return jsonify({'status': 'error', 'message': 'Unable to access the camera'}), 500

        # Wait for a moment to let the camera adjust
        for _ in range(5):
            cap.read()

        # Capture a frame
        ret, frame = cap.read()
        if not ret:
            return jsonify({'status': 'error', 'message': 'Failed to capture image'}), 500

        # Convert to RGB for face_recognition library
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Detect faces in the image
        face_locations = face_recognition.face_locations(rgb_frame)
        
        if not face_locations:
            return jsonify({'status': 'error', 'message': 'No face detected'}), 400

        # Save the captured image with face
        image_path = os.path.join(os.getcwd(), 'captured_image.jpg')
        cv2.imwrite(image_path, frame)

        return jsonify({
            'status': 'success',
            'message': 'Face captured successfully',
            'image_path': image_path,
            'face_detected': True
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

    finally:
        if cap is not None:
            cap.release()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    app.run(debug=True)
