import numpy as np
import matplotlib.pyplot as plt

# Load the scrambled matrix
encoded_array = np.load("encoded_array.npy")

# reshape the array (100 x 100)
decoded_image = encoded_array.reshape((100, 100))

# Rotate to invert the image
rotated_image = np.rot90(decoded_image, k=-1)

# showing the image
plt.imshow(rotated_image)
plt.axis("off")
plt.show()