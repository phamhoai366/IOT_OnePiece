import yolov5
import cv2
# load pretrained model
#model = yolov5.load('yolov5s.pt')

# or load custom model
model = yolov5.load('best.pt')


cap = cv2.VideoCapture(0)

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    img=frame
    
    # set model parameters
    model.conf = 0.25  # NMS confidence threshold
    model.iou = 0.45  # NMS IoU threshold
    model.agnostic = False  # NMS class-agnostic
    model.multi_label = False  # NMS multiple labels per box
    model.max_det = 1000  # maximum number of detections per image

    img =cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    img2=img

    # perform inference
    results = model(img)

    # inference with larger input size
    results = model(img, size=1280)

    # inference with test time augmentation
    results = model(img, augment=True)


    # parse results
    predictions = results.pred[0]
    boxes = predictions[:, :4] # x1, y1, x2, y2
    a=boxes.tolist()
    scores = predictions[:, 4]
    categories = predictions[:, 5]

    
    if len(a)!=0:

        img= cv2.rectangle(img2, (int(a[0][0]),int(a[0][1])), (int(a[0][2]),int(a[0][3])), (0,0,255))
        img=cv2.resize(img,dsize=(700,500))
    #    # Display the resulting frame
    
    cv2.imshow('frame',img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
