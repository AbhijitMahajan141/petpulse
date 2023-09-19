from flask import Flask, request, jsonify
from scipy import io
import tensorflow as tf
import numpy as np
from PIL import Image

def preprocess_image(image):
    # Resize the image to the target input size of your model
    target_size = (256, 256)  # Adjust this according to your model's input size
    image = tf.image.resize(image, target_size)
    
    # Convert image to the format expected by the model
    image = tf.keras.applications.mobilenet_v2.preprocess_input(image)
    
    return image

app = Flask(__name__)

model = tf.keras.load_model('')

@app.route('/predict',methods=['POST'])
def predict():
    try:
        #Get uploaded image
        image = request.files['image'].read()
        image = Image.open(io.BytesIO(image))
        image = np.array(image)

        #preprocess Image
        processed_image = preprocess_image(image)

        #Make prediction
        prediction = model.predict(np.expand_dims(processed_image,axis=0))
        predicted_class = "Pet" if prediction > 0.5 else "Not Pet"

        return jsonify({'Prediction':predicted_class})
    except Exception as e:
        return jsonify({'error':str(e)})
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)