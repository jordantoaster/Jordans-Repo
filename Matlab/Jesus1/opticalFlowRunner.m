
%load the video and extract the frames
fileNameOne = 'viptraffic.avi';
videoObjOne = VideoReader(fileNameOne);
vidFramesOne = read(videoObjOne);
vidSize = size(vidFramesOne);


for t = 2:120
   currentFrame = vidFramesOne(:,:,:,t);   
   currentFrameG = rgb2gray(currentFrame);  
   currentFrameG = double(currentFrameG);
   previousFrame = vidFramesOne(:,:,:,t-1);
   previousFrame = rgb2gray(previousFrame);
   previousFrame = double(previousFrame);
   
   [u, v] = HS(previousFrame, currentFrameG);

    figure(1)
    imshow(previousFrame,[0 255]), hold on
    quiver(u, v, 4, 'color', 'b', 'linewidth', 2);
    set(gca,'YDir','reverse');
    hold off
    
    mag = sqrt(u.^2+v.^2);
    vel_th = 3;
    Blobs = mag >= vel_th;
end    
   