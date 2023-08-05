import tensorflow as tf

model = tf.keras.models.load_model("handwritten.h5")
output_node_name = model.output_names[0]
print(f"Output node name: {output_node_name}")
