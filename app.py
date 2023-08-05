from flask import Flask, request, jsonify
import numpy as np
import cv2
import tensorflow as tf

app = Flask(__name__)
model = None


# Load the pre-trained model
def load_model():
    global model
    model = tf.keras.models.load_model("handwritten.h5")


# Preprocess the input data
def preprocess_input(data):
    img = np.array(data)
    img = cv2.resize(img, (28, 28))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = np.invert(img)
    img = img.reshape((1, 28, 28, 1))
    img = img / 255.0
    return img


# Predict the digit
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json["data"]  # The drawing data from the JavaScript app
        img = preprocess_input(data)
        prediction = model.predict(img)
        digit = np.argmax(prediction)
        return jsonify({"digit": int(digit)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    load_model()
    app.run(port=5000)
