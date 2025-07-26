# import cv2
# import mediapipe as mp
# import time


# cap = cv2.VideoCapture(0)

# mpHands = mp.solutions.hands
# hands = mpHands.Hands()
# mpDraw = mp.solutions.drawing_utils

# pTime = 0
# cTime = 0   

# while True:
#     success, img = cap.read()   

#     imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#     results = hands.process(imgRGB)
#     print(results.multi_hand_landmarks) 

#     if results.multi_hand_landmarks:
#         for handLms in results.multi_hand_landmarks:
#             for id, lm in enumerate(handLms.landmark):
#                 print(id, lm)
#                 h, w, c = img.shape
#                 cx, cy = int(lm.x * w), int(lm.y * h)
#                 print(id, cx, cy)
#                 if id == 4:
#                     cv2.circle(img, (cx, cy), 15, (255, 0, 255), cv2.FILLED)

#             mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)

#     cTime = time.time()
#     fps = 1 / (cTime - pTime)
#     pTime = cTime

#     cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_PLAIN, 3,
#                 (255, 0, 255), 3)

#     cv2.imshow("Image", img)
#     cv2.waitKey(1)





import cv2  # OpenCV library for computer vision tasks
import mediapipe as mp  # MediaPipe library for hand detection and tracking
import time  # Standard library for time-related functions

# Capture video from the default webcam
cap = cv2.VideoCapture(0)

# Initialize MediaPipe Hands solution
mpHands = mp.solutions.hands
hands = mpHands.Hands()
# Utility to draw landmarks and connections on the image
mpDraw = mp.solutions.drawing_utils

# Initialize variables for calculating FPS (Frames Per Second)
pTime = 0  # Previous time
cTime = 0  # Current time

# Infinite loop to process each frame from the webcam
while True:
    # Read a frame from the webcam
    success, img = cap.read()   

    # Convert the frame from BGR (default color format in OpenCV) to RGB
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Process the RGB image to detect hands and their landmarks
    results = hands.process(imgRGB)
    print(results.multi_hand_landmarks)  # Print the hand landmarks for debugging

    # Check if any hand landmarks are detected
    if results.multi_hand_landmarks:
        # Loop through each detected hand
        for handLms in results.multi_hand_landmarks:
            # Loop through each landmark in the hand
            for id, lm in enumerate(handLms.landmark):
                print(id, lm)  # Print the landmark ID and its coordinates for debugging
                # Get the dimensions of the image
                h, w, c = img.shape
                # Convert normalized landmark coordinates to pixel coordinates
                cx, cy = int(lm.x * w), int(lm.y * h)
                print(id, cx, cy)  # Print the landmark ID and pixel coordinates for debugging
                # If the landmark is the tip of the thumb (ID 4), draw a circle at that point
                if id == 4:
                    cv2.circle(img, (cx, cy), 15, (255, 0, 255), cv2.FILLED)

            # Draw the hand landmarks and connections on the image
            mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)

    # Calculate the current time and FPS
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime

    # Display the FPS on the image
    cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 255), 3)

    # Show the image in a window
    cv2.imshow("Image", img)
    cv2.waitKey(1)  # Wait for 1 millisecond between frames
