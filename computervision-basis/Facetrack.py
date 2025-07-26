import cv2
import mediapipe as mp
import time

# Initialize video capture
cap = cv2.VideoCapture(0)

# Initialize Mediapipe Hand and Face Mesh solutions
mpHands = mp.solutions.hands
hands = mpHands.Hands()
mpDraw = mp.solutions.drawing_utils

mpFaceMesh = mp.solutions.face_mesh
faceMesh = mpFaceMesh.FaceMesh()
drawSpec = mpDraw.DrawingSpec(thickness=1, circle_radius=1)

# Initialize variables for FPS calculation
pTime = 0
cTime = 0   

while True:
    success, img = cap.read()   
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Process the frame for hand landmarks
    hand_results = hands.process(imgRGB)
    if hand_results.multi_hand_landmarks:
        for handLms in hand_results.multi_hand_landmarks:
            for id, lm in enumerate(handLms.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                if id == 4:  # Thumb tip
                    cv2.circle(img, (cx, cy), 15, (255, 0, 255), cv2.FILLED)
            mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)

    # Process the frame for face landmarks
    face_results = faceMesh.process(imgRGB)
    if face_results.multi_face_landmarks:
        for faceLms in face_results.multi_face_landmarks:
            for id, lm in enumerate(faceLms.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                if id == 1:  # Example landmark (between the eyes)
                    cv2.circle(img, (cx, cy), 2, (0, 255, 0), cv2.FILLED)
            mpDraw.draw_landmarks(img, faceLms, mpFaceMesh.FACEMESH_CONTOURS, drawSpec, drawSpec)

    # Calculate and display FPS
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 255), 3)

    # Display the image
    cv2.imshow("Image", img)
    cv2.waitKey(1)
