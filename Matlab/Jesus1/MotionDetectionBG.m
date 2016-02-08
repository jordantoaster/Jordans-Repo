function MotionDetectionBG()

%load the video and extract the frames
fileNameOne = 'viptraffic.avi';
videoObjOne = VideoReader(fileNameOne);
vidFramesOne = read(videoObjOne);

%get last frame and display
frameSizeInfo = size(vidFramesOne);
%bkg = vidFramesOne(:,:,:,120);
%imshow(bkg);

%convert to grayscale and get size for reference
%bkgG = rgb2gray(bkg);
%frameSizeInfoG = size(bkgG);

%method 2 of conversion
%BkgGray2 = bkg(:,:,1)/3 + bkg(:,:,2)/3 + bkg(:,:,3)/3;

%compare the 3 images
%figure
%subplot(1,3,1), imshow(bkg), title('Colour Bkg')
%subplot(1,3,2), imshow(bkgG), title('Gray Bkg'), colormap(gray)
%subplot(1,3,3), imshow(BkgGray2), title('Gray Bkg Approx'), colormap(gray)

%get median filter bg
bkgG = bckGenerator(vidFramesOne, 5);

%create object for output
vidObj2 = VideoWriter('resultTraffic.avi');
open(vidObj2);
MAP=colormap(gray(256));

%get each frame from image in loop
for t = 1:120
   currentFrame = vidFramesOne(:,:,:,t);
   
   %comvert to G
   currentFrameG = rgb2gray(currentFrame);
   
   %plots each frame with the background, changing in 0.2 intervals
   subplot(2,3,1), imshow(currentFrameG), title(['Frame: ',num2str(t)])
   subplot(2,3,2), imshow(bkgG), title('Background')
   pause(0.2)
   
   %convert to double - helps with black car
   currentFrameG = double(currentFrameG);
   
   %performs background subisition and displays using a threshold
   Blobs=abs(currentFrameG - bkgG) > 12.5;
   subplot(2,3,3), imshow(Blobs), title('Blobs'), colormap(gray)
   
   %morphology
   Mask= ones(5,5);
   BlobsCorrect = imclose(Blobs, Mask);
   BlobsCorrect = imopen(Blobs, Mask);

   subplot(2,3,4), imshow(BlobsCorrect), title('Post-processed Blobs'), colormap(gray)
   
   %bw label applied
   BlobsLabel = bwlabel(BlobsCorrect,4);
   subplot(2,3,5), imshow(BlobsLabel), title('Labelling')
   
   %count amount of cars
   NumVehicles = max(max(BlobsLabel));
   
    %get the range for the bounding rectangle and add to matrix
    BBs = [];  
    for b = 1: NumVehicles
    [ys xs]=find(BlobsLabel == b);
    xmax = max(xs);
    ymax = max(ys);
    xmin = min(xs);
    ymin = min(ys);

    BB = [xmin ymin xmax ymax];
    BBs = [BBs; BB];
    end
    
    %plot rectangle on top of blob
    subplot(2,3,6), imshow(currentFrame), title('Detections'), hold on
    for b = 1: NumVehicles
    rectangle('Position', [BBs(b,1) BBs(b,2) BBs(b,3)-BBs(b,1) BBs(b,4)-BBs(b,2)])
    end
    hold off
   
   %convert blob to frame and save
   frame = im2frame(uint8(Blobs)*255, MAP);
   writeVideo(vidObj2,frame);
end

close(vidObj2);

end

