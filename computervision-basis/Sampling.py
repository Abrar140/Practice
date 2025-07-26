# sampling

# from PIL import Image

# # Open the original image
# original_image = Image.open('./download.jpeg')

# # Resize the image
# resized_image = original_image.resize((1024, 1024), Image.LANCZOS)

# # Save the resized image
# resized_image.save('./resized_image.jpg')

# # Optionally, display the images to verify
# original_image.show()
# resized_image.show()


# quantization

# from PIL import Image

# def quantize_image(image, num_shades):
#     # Quantize the image
#     return image.convert('L').point(lambda x: (x // (256 // num_shades)) * (256 // num_shades))

# # Open the original image
# original_image = Image.open('./download.jpeg')

# # Resize the image to 1024x1024
# resized_image = original_image.resize((1024, 1024), Image.LANCZOS)

# # Apply quantization
# quantized_16_gray = quantize_image(resized_image, 16)
# quantized_8_gray = quantize_image(resized_image, 8)
# quantized_4_gray = quantize_image(resized_image, 4)
# quantized_binary = quantize_image(resized_image, 2)

# # Save the quantized images
# quantized_16_gray.save('./quantized_16_gray.jpg')
# quantized_8_gray.save('./quantized_8_gray.jpg')
# quantized_4_gray.save('./quantized_4_gray.jpg')
# quantized_binary.save('./quantized_binary.jpg')

# # Optionally, display the images to verify
# resized_image.show()
# quantized_16_gray.show()
# quantized_8_gray.show()
# quantized_4_gray.show()
# quantized_binary.show()





import cv2
from matplotlib import pyplot as plt
from PIL import Image

# Read image using OpenCV
image_cv = cv2.imread('./download.jpeg')

# Resize image using OpenCV
resized_image = cv2.resize(image_cv, (800, 600))

# Plot resized image using OpenCV
plt.figure()

plt.subplot(1, 2, 1)
plt.imshow(cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB))
plt.title("Resized image (OpenCV)")

# Read and resize image using PIL
image_pil = Image.open('./download.jpeg')
image_pil_resized = image_pil.resize((800, 600))

# Plot original and resized image using PIL
plt.subplot(1, 2, 2)
plt.imshow(image_pil_resized)
plt.title("Resized image (PIL)")

plt.show()
