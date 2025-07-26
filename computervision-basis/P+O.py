import cv2
from PIL import Image
import matplotlib.pyplot as plt

# Global variables to store the cropping box coordinates
start_point = None
end_point = None
cropping = False

def click_and_crop(event, x, y, flags, param):
    global start_point, end_point, cropping

    # If the left mouse button was clicked, record the starting coordinates
    if event == cv2.EVENT_LBUTTONDOWN:
        start_point = (x, y)
        cropping = True

    # Check if the left mouse button was released
    elif event == cv2.EVENT_LBUTTONUP:
        end_point = (x, y)
        cropping = False
        
        # Draw a rectangle around the region of interest
        cv2.rectangle(image, start_point, end_point, (0, 255, 0), 2)
        cv2.imshow("Image", image)

def crop_image_with_mouse(input_image_path, output_image_path):
    global image
    image = cv2.imread(input_image_path)
    clone = image.copy()

    # Set up the mouse callback function
    cv2.namedWindow("Image")
    cv2.setMouseCallback("Image", click_and_crop)

    while True:
        # Display the image and wait for a keypress
        cv2.imshow("Image", image)
        key = cv2.waitKey(1) & 0xFF

        # If the 'q' key is pressed, break the loop
        if key == ord("q"):
            break

        # If cropping is finished, crop the image
        if not cropping and start_point and end_point:
            # Get the coordinates for the crop
            x_start, y_start = start_point
            x_end, y_end = end_point

            # Ensure coordinates are within image boundaries
            x_start = max(0, min(x_start, image.shape[1]))
            y_start = max(0, min(y_start, image.shape[0]))
            x_end = max(0, min(x_end, image.shape[1]))
            y_end = max(0, min(y_end, image.shape[0]))

            # Crop the image using the selected coordinates
            cropped_image = clone[y_start:y_end, x_start:x_end]

            # Convert the cropped image from BGR (OpenCV format) to RGB (Pillow format)
            cropped_image_rgb = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)
            pil_image = Image.fromarray(cropped_image_rgb)
            pil_image.save(output_image_path)
            print(f"Cropped image saved as {output_image_path}")

            break

    cv2.destroyAllWindows()

# Example usage
# if __name__ == "__main__":
#     input_path = 'C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg'  # Input image path
#     output_path = 'C:/Users/Abrar/Desktop/pythons/Images/cropped_LoinKing.jpeg'  # Output image path

#     crop_image_with_mouse(input_path, output_path)



# Load the grayscale image
image = cv2.imread("C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg", cv2.IMREAD_GRAYSCALE)

# Apply Sobel edge detection
sobel_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=5)  # Gradient in x
sobel_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=5)  # Gradient in y
sobel_magnitude = cv2.magnitude(sobel_x, sobel_y)
sobel_magnitude = cv2.convertScaleAbs(sobel_magnitude)  # Convert to uint8

# Apply Canny edge detection on the Sobel result
canny_edges = cv2.Canny(sobel_magnitude, threshold1=100, threshold2=200)

# Plot the results
plt.figure(figsize=(12, 6))

# Original Image
plt.subplot(1, 3, 1)
plt.imshow(image, cmap='gray')
plt.title('Original Image')
plt.axis('off')

# Sobel Edge Detection
plt.subplot(1, 3, 2)
plt.imshow(sobel_magnitude, cmap='gray')
plt.title('Sobel Edge Detection')
plt.axis('off')

# Canny Edge Detection on Sobel result
plt.subplot(1, 3, 3)
plt.imshow(canny_edges, cmap='gray')
plt.title('Canny on Sobel Result')
plt.axis('off')

plt.tight_layout()
plt.show()
