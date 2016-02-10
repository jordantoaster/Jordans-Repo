function MotionDetectionBG()

%load the video and extract the frames
fileNameOne = 'viptraffic.avi';
videoObjOne = VideoReader(fileNameOne);
vidFramesOne = read(videoObjOne);

%V1 - select a empty backgroud manually
%bkg = vidFramesOne(:,:,:,120);

%convert to grayscale and get size for reference - V1
%bkgG = rgb2gray(bkg);

%V2 - generate BG using mediam filter approach if no BG free
bkgG = bckGenerator(vidFramesOne, 5);

%create object for Saving the video - and essential scheme - MAP
%vidObj2 = VideoWriter('resultTraffic.avi');
%open(vidObj2);
%MAP=colormap(gray(256));

%iterate all the frames
for t = 1:120
   %get the current frame and current it to grayscale
   currentFrame = vidFramesOne(:,:,:,t);
   currentFrameG = rgb2gray(currentFrame);
   
   %plots each and background - waits 0.2 seconds and proceeds
   subplot(2,3,1), imshow(currentFrameG), title(['Frame: ',num2str(t)])
   subplot(2,3,2), imshow(bkgG), title('Background')
   pause(0.1)
   
   %convert to double - black car can now be identified
   bkgG = double(bkgG);
   currentFrameG = double(currentFrameG);
   
   %performs background subisition by difference frame with bg - applys a
   %threshold and uses the absolute value
   Blobs=abs(currentFrameG - bkgG) > 20;
   
   %plots the threshold version of the frame
   subplot(2,3,3), imshow(Blobs), title('Blobs'), colormap(gray)
   
   %morphology
   Mask= ones(7,7);
   BlobsCorrect = imclose(Blobs, Mask);

    %plot the adjusted blobs
   subplot(2,3,4), imshow(BlobsCorrect), title('Post-processed Blobs'), colormap(gray)
   
   %bw label applied which allows getting of amount of cars
   BlobsLabel = bwlabel(BlobsCorrect,4);
   subplot(2,3,5), imshow(BlobsLabel), title('Labelling')
   
   %count amount of cars
   NumVehicles = max(max(BlobsLabel));
   
    %store the bounding boxes in an array
    BBs = [];  
    
    for b = 1: NumVehicles
        %get the x's and y's
        [ys xs]=find(BlobsLabel == b);
        
        %assign the x's and y's to variables
        xmax = max(xs);
        ymax = max(ys);
        xmin = min(xs);
        ymin = min(ys);

        %create and store the bounding box
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
   %frame = im2frame(uint8(Blobs)*255, MAP);
   %writeVideo(vidObj2,frame);
end

%close(vidObj2);

end

