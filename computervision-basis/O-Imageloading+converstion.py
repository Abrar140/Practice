
import cv2
import numpy as np
import matplotlib.pyplot as plt



def resize_image(image_path, output_path, width=None, height=None):
    # Load the image
    image = cv2.imread(image_path)
    
    # Get the original dimensions
    (h, w) = image.shape[:2]
    
    # Calculate the aspect ratio
    aspect_ratio = w / h
    
    # Determine new dimensions
    if width is None and height is None:
        raise ValueError("Either width or height must be provided.")
    elif width is not None:
        new_width = width
        new_height = int(width / aspect_ratio)
    elif height is not None:
        new_height = height
        new_width = int(height * aspect_ratio)
    
    # Resize the image
    new_dim = (new_width, new_height)
    resized_image = cv2.resize(image, new_dim, interpolation=cv2.INTER_AREA)
    
    # Save the resized image
    cv2.imwrite(output_path, resized_image)

# Example usage
# resize_image('C:/Users/Abrar/Desktop/pythons/Images/download.jpeg', 'C:/Users/Abrar/Desktop/pythons/Images/resize.jpeg', width=800)



def crop_image_opencv(input_image_path, output_image_path, crop_box):
    # Read the image using OpenCV
    image = cv2.imread(input_image_path)
    
    # Check if the image was loaded successfully
    if image is None:
        print(f"Error: Unable to load image at {input_image_path}. Check the file path.")
        return
    
    # Crop the image using the provided box (x_start, y_start, x_end, y_end)
    x_start, y_start, x_end, y_end = crop_box

    # Ensure coordinates are within image boundaries
    h, w = image.shape[:2]
    x_start = max(0, min(x_start, w))
    y_start = max(0, min(y_start, h))
    x_end = max(0, min(x_end, w))
    y_end = max(0, min(y_end, h))

    # Perform cropping
    cropped_image = image[y_start:y_end, x_start:x_end]
    
    # Save the cropped image
    cv2.imwrite(output_image_path, cropped_image)
    print(f"Cropped image saved as {output_image_path}")

# Example usage
# if __name__ == "__main__":
#     input_path = 'C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg'  # Input image path
#     output_path = 'C:/Users/Abrar/Desktop/pythons/Images/cropped_LoinKing.jpeg'  # Desired output image path
#     crop_coordinates = (100, 100, 400, 400)  # (x_start, y_start, x_end, y_end)

#     crop_image_opencv(input_path, output_path, crop_coordinates)





def rotate_image(image_path, angle):
    # Load the image
    image = cv2.imread(image_path)
    
    # Get image dimensions
    (h, w) = image.shape[:2]
    
    # Calculate the center of the image
    center = (w // 2, h // 2)
    
    # Create the rotation matrix
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    
    # Perform the rotation and handle the artifacts by using the flags
    rotated_image = cv2.warpAffine(image, M, (w, h), borderMode=cv2.BORDER_REPLICATE)

    return rotated_image

# Example usage
# rotated = rotate_image('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg', 90)  # Rotate by 45 degrees
# cv2.imwrite('C:/Users/Abrar/Desktop/pythons/Images/rotated_image.jpg', rotated)
# cv2.imshow('Rotated Image', rotated)
# cv2.waitKey(0)
# cv2.destroyAllWindows()






# # Load the grayscale image
# image = cv2.imread('C:/Users/Abrar/Desktop/pythons/Images/DogGrayScale.jpeg', cv2.IMREAD_GRAYSCALE)

# # Calculate histogram
# hist = cv2.calcHist([image], [0], None, [256], [0, 256])

# # Plot histogram
# plt.figure(figsize=(10, 5))
# plt.plot(hist, color='black')
# plt.title('Histogram of Grayscale Image (OpenCV)')
# plt.xlabel('Pixel Values')
# plt.ylabel('Frequency')
# plt.xlim([0, 256])
# plt.grid()
# plt.show()




# # Load the grayscale image
# image = cv2.imread('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg', cv2.IMREAD_GRAYSCALE)

# # Apply Sobel edge detection
# sobel_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=5)  # Gradient in x
# sobel_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=5)  # Gradient in y
# sobel_magnitude = cv2.magnitude(sobel_x, sobel_y)

# # Convert to uint8
# sobel_magnitude = cv2.convertScaleAbs(sobel_magnitude)

# # Plot the results
# plt.figure(figsize=(12, 6))
# plt.subplot(1, 2, 1)
# plt.imshow(image, cmap='gray')
# plt.title('Original Image')
# plt.axis('off')

# plt.subplot(1, 2, 2)
# plt.imshow(sobel_magnitude, cmap='gray')
# plt.title('Sobel Edge Detection')
# plt.axis('off')

# plt.show()






# Read the image
image = cv2.imread('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg', cv2.IMREAD_GRAYSCALE)

# Get min and max pixel values
min_pixel = np.min(image)
max_pixel = np.max(image)

# Apply contrast stretching
contrast_stretched = (image - min_pixel) * (255 / (max_pixel - min_pixel))
contrast_stretched = np.uint8(contrast_stretched)

# Save or display the image
cv2.imwrite('contrast_stretched_opencv.jpg', contrast_stretched)
cv2.imshow('Contrast Stretched Image', contrast_stretched)
cv2.waitKey(0)
cv2.destroyAllWindows()
