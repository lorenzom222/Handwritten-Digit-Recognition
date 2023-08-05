import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf


# mnist = tf.keras.datasets.mnist

# (x_train, y_train),(x_test,y_test) = mnist.load_data()

# x_train = tf.keras.utils.normalize(x_train, axis=1)
# x_test = tf.keras.utils.normalize(x_test, axis=1)

model = tf.keras.models.load_model("handwritten.h5")


# loss,  accuracy = model.evaluate(x_test, y_test)


image_number = 1

while os.path.isfile(f"my-digits/digit-{image_number}.png"):
    try:
        img = cv2.imread(f"my-digits/digit-{image_number}.png")[:, :, 0]
        img = np.invert(np.array([img]))
        prediction = model.predict(img)
        print(f"The digit is probably a {np.argmax(prediction)}")
        plt.imshow(img[0], cmap=plt.cm.binary)
        plt.show()
    except:
        print("Error")
    finally:
        image_number += 1