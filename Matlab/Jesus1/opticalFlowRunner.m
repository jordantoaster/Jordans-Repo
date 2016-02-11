
%load the video and extract the frames
fileNameOne = 'shopping_center.mpg';
videoObjOne = VideoReader(fileNameOne);
vidFramesOne = read(videoObjOne);
vidSize = size(vidFramesOne);

%start at 2 to avoid out of bounds error as we use 2 + 1
for t = 2:120
    
    %get frames and convert to required format
   currentFrame = vidFramesOne(:,:,:,t);   
   currentFrameG = rgb2gray(currentFrame);  
   currentFrameG = double(currentFrameG);
   previousFrame = vidFramesOne(:,:,:,t-1);
   previousFrame = rgb2gray(previousFrame);
   previousFrame = double(previousFrame);
   
   %calculates the optical flow
   [u, v] = HS(previousFrame, currentFrameG);

    figure(1)
    imshow(previousFrame,[0 255]), hold on
    quiver(u, v, 4, 'color', 'b', 'linewidth', 2);
    set(gca,'YDir','reverse');
    hold off
    drawnow;
    
    %convert using the magnitude
    mag = sqrt(u.^2+v.^2);
    vel_th = 3;
    Blobs = mag >= vel_th;
end    
   