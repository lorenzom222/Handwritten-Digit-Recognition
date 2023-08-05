import os
import cv2
import numpy
import matplotlib.pyplot as plt
import tensorflow as tf


mnist = tf.keras.datasets.mnist

(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = tf.keras.utils.normalize(x_train, axis=1)
x_test = tf.keras.utils.normalize(x_test, axis=1)

model = tf.keras.models.Sequential()

# Flattens turns 2d or n-d grid into 1d
model.add(tf.keras.layers.Flatten(input_shape=(28, 28)))
# Activation function is relus, with 128 unit
model.add(tf.keras.layers.Dense(128, activation="relu"))
model.add(tf.keras.layers.Dense(128, activation="relu"))  # why 2?>?
# Final is going to be softmax, to make sure that all outputs
# add up to 1. The confidence layer, how likely image is this digit
# 10 units for each number: 0-9
model.add(tf.keras.layers.Dense(10, activation="softmax"))

model.compile(
    optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"]
)


# Train model
model.fit(x_train, y_train, epochs=3)

model.save("handwritten.h5")
