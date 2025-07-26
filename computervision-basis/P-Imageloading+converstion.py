from PIL import Image

def resize_image(imagepath, outputpath, width=None, height=None):
    # Open the image file
    with Image.open(imagepath) as image:
        # Get the original dimensions
        (orgwidth, orgheight) = image.size
        aspectRatio = orgwidth / orgheight

        # Check for valid width and height inputs
        if width is None and height is None:
            raise ValueError("Either width or height must be provided.")
        
        # Calculate new dimensions based on the given width or height
        if width is not None:
            if not isinstance(width, int):
                raise ValueError("Width must be an integer.")
            newwidth = width
            newheight = int(width / aspectRatio)
        elif height is not None:
            if not isinstance(height, int):
                raise ValueError("Height must be an integer.")
            newheight = height
            newwidth = int(height * aspectRatio)

        # Resize the image using LANCZOS filter for high-quality resampling
        resized_image = image.resize((newwidth, newheight), Image.LANCZOS)
        
        # Save the resized image
        resized_image.save(outputpath)

def show_image(image_path):
    try:
        # Load the image from file
        with Image.open(image_path) as image:
            # Convert to grayscale
            grayscale = image.convert('L')

            # Display the images
            grayscale.show()
            image.show()
    except FileNotFoundError:
        print(f"File not found: {image_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
# resize_image('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg', 'C:/Users/Abrar/Desktop/pythons/Images/resize.jpeg', width=800)
# show_image('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg')

def crop_image_pillow(input_image_path, output_image_path, crop_box):
    # Open the image using Pillow
    image = Image.open(input_image_path)
    
    # Crop the image using the provided box (x_start, y_start, x_end, y_end)
    x_start, y_start, x_end, y_end = crop_box
    cropped_image = image.crop((x_start, y_start, x_end, y_end))
    
    # Save the cropped image
    cropped_image.save(output_image_path)
    print(f"Cropped image saved as {output_image_path}")

# # Example usage
# if __name__ == "__main__":
#     input_path = 'C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg'  # Replace with your input image path
#     output_path = 'C:/Users/Abrar/Desktop/pythons/Images/cropped_LoinKing.jpeg'  # Desired output image path
#     crop_coordinates = (100, 100, 400, 400)  # (x_start, y_start, x_end, y_end)

#     crop_image_pillow(input_path, output_path, crop_coordinates)




def rotate_image(image_path, angle):
    # Load the image
    image = Image.open(image_path)
    
    # Rotate the image and expand to fit the new bounding box
    rotated_image = image.rotate(angle, expand=True)
    
    return rotated_image

# Example usage
# rotated = rotate_image('C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg', 45)  # Rotate by 45 degrees
# rotated.save('C:/Users/Abrar/Desktop/pythons/Images/rotated_image_pillow.jpg')
# rotated.show()



import tkinter as tk
from PIL import Image, ImageTk

class ImageRotator:
    def __init__(self, master, image_path):
        self.master = master
        self.image_path = image_path
        self.angle = 0

        # Load the image
        self.original_image = Image.open(image_path)
        self.displayed_image = self.original_image

        # Set up the Tkinter UI
        self.canvas = tk.Canvas(master, width=self.original_image.width, height=self.original_image.height)
        self.canvas.pack()

        self.slider = tk.Scale(master, from_=0, to=360, orient='horizontal', command=self.update_image)
        self.slider.pack()

        # Initial display
        self.update_image(self.angle)

    def update_image(self, angle):
        self.angle = int(angle)
        # Rotate the image
        rotated_image = self.original_image.rotate(self.angle, expand=True)

        # Convert to ImageTk format and display
        self.displayed_image = ImageTk.PhotoImage(rotated_image)
        self.canvas.create_image(0, 0, anchor='nw', image=self.displayed_image)
        self.master.title(f"Rotation Angle: {self.angle}°")

# if __name__ == "__main__":
#     root = tk.Tk()
#     app = ImageRotator(root, 'C:/Users/Abrar/Desktop/pythons/Images/LoinKing.jpeg')
#     root.mainloop()





# # Load the grayscale image
# image = Image.open('C:/Users/Abrar/Desktop/pythons/Images/DogGrayScale.jpeg').convert('L')

# # Convert image to numpy array
# image_array = np.array(image)

# # Calculate histogram
# hist, bins = np.histogram(image_array.flatten(), bins=256, range=[0, 256])

# # Plot histogram
# plt.figure(figsize=(10, 5))
# plt.plot(hist, color='black')
# plt.title('Histogram of Grayscale Image (PIL)')
# plt.xlabel('Pixel Values')
# plt.ylabel('Frequency')
# plt.xlim([0, 256])
# plt.grid()
# plt.show()


# import cv2
# import matplotlib.pyplot as plt

# # Load the grayscale image
# image = cv2.imread('C:/Users/Abrar/Desktop/pythons/Images/DogGrayScale.jpeg', cv2.IMREAD_GRAYSCALE)

# # Apply Canny edge detection
# canny_edges = cv2.Canny(image, threshold1=100, threshold2=200)

# # Plot the results
# plt.figure(figsize=(12, 6))
# plt.subplot(1, 2, 1)
# plt.imshow(image, cmap='gray')
# plt.title('Original Image')
# plt.axis('off')

# plt.subplot(1, 2, 2)
# plt.imshow(canny_edges, cmap='gray')
# plt.title('Canny Edge Detection')
# plt.axis('off')

# plt.show()



from PIL import Image
import numpy as np

# Read the image
image = Image.open('C:/Users/Abrar/Desktop/pythons/Images/download.jpeg').convert('L')  # Convert to grayscale
image_np = np.array(image)

# Get min and max pixel values
min_pixel = np.min(image_np)
max_pixel = np.max(image_np)

# Apply contrast stretching
contrast_stretched = (image_np - min_pixel) * (255 / (max_pixel - min_pixel))
contrast_stretched = np.uint8(contrast_stretched)

# Convert back to PIL image and save
contrast_stretched_image = Image.fromarray(contrast_stretched)
contrast_stretched_image.save('contrast_stretched_pil.jpg')
contrast_stretched_image.show()
