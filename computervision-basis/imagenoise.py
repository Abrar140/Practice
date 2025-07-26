import cv2
import numpy as np

# Load your image
image = cv2.imread('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg')

# Create a noise array
noise = np.random.normal(0, 2, image.shape).astype(np.uint8)  # Adjust 25 for different noise levels

# Add noise to the image
noisy_image = cv2.add(image, noise)

# Save or display the noisy image
cv2.imwrite('noisy_image.jpg', noisy_image)
cv2.imshow('Noisy Image', noisy_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
