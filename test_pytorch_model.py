import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import torch
from torchvision import transforms
from torch import nn

# Define the model architecture
model = nn.Sequential(
    nn.Flatten(),
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 128),
    nn.ReLU(),
    nn.Linear(128, 10),
    nn.LogSoftmax(dim=1),
)

# Load the trained model
model.load_state_dict(torch.load("handwritten.pth"))

# Define a transform to normalize the data
transform = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))]
)

image_number = 1

while os.path.isfile(f"my-digits/digit-{image_number}.png"):
    try:
        img = cv2.imread(f"my-digits/digit-{image_number}.png")[:, :, 0]
        img = np.invert(img)
        img = transform(img).unsqueeze(0)
        with torch.no_grad():
            logps = model(img)
        ps = torch.exp(logps)
        probab = list(ps.numpy()[0])
        print(f"The digit is probably a {probab.index(max(probab))}")
        plt.imshow(img[0].squeeze(), cmap=plt.cm.binary)
        plt.show()
    except:
        print("Error")
    finally:
        image_number += 1
