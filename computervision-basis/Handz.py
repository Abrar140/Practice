import cv2
import mediapipe as mp
import numpy as np
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
from comtypes import CLSCTX_ALL
from ctypes import cast, POINTER

# Initialize MediaPipe Hands.
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

# Initialize the camera.
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Get the audio endpoint.
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(
    IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))

# Get the volume range.
volume_range = volume.GetVolumeRange()
min_volume = volume_range[0]
max_volume = volume_range[1]

# Initialize volume.
current_volume = volume.GetMasterVolumeLevel()
volume_percentage = np.interp(current_volume, [min_volume, max_volume], [0, 100])

while True:
    # Capture frame-by-frame.
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    # Flip the frame horizontally for a later selfie-view display, and convert the BGR image to RGB.
    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process the frame and find hands.
    result = hands.process(rgb_frame)

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            # Draw hand connections in green.
            mp_drawing.draw_landmarks(
                frame, 
                hand_landmarks, 
                mp_hands.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2)
            )
            
            # Get coordinates of the thumb tip and index finger tip.
            thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            
            h, w, c = frame.shape
            thumb_tip_x = int(thumb_tip.x * w)
            thumb_tip_y = int(thumb_tip.y * h)
            index_tip_x = int(index_tip.x * w)
            index_tip_y = int(index_tip.y * h)
            
            # Draw the thumb tip in red.
            cv2.circle(frame, (thumb_tip_x, thumb_tip_y), 5, (0, 0, 255), -1)
            # Draw the index finger tip in red.
            cv2.circle(frame, (index_tip_x, index_tip_y), 5, (0, 0, 255), -1)
            
            # Draw a line between the thumb tip and index finger tip.
            cv2.line(frame, (thumb_tip_x, thumb_tip_y), (index_tip_x, index_tip_y), (0, 0, 255), 2)
            
            # Calculate the distance between thumb and index finger.
            distance = np.sqrt((thumb_tip_x - index_tip_x) ** 2 + (thumb_tip_y - index_tip_y) ** 2)
            
            # Map the distance to volume level.
            volume_level = np.interp(distance, [50, 300], [min_volume, max_volume])
            volume.SetMasterVolumeLevel(volume_level, None)
            
            # Update volume percentage.
            volume_percentage = np.interp(volume_level, [min_volume, max_volume], [0, 100])
            
            # Display the volume percentage on the frame.
            cv2.putText(frame, f'Volume: {int(volume_percentage)}%', (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    # Display the resulting frame.
    cv2.imshow('Hand Tracking', frame)

    # Press 'q' on the keyboard to exit the loop.
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows.
cap.release()
cv2.destroyAllWindows()
