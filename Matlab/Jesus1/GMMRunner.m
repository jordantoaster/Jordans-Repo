
%load the video and extract the frames
fileNameOne = 'viptraffic.avi';
videoObjOne = VideoReader(fileNameOne);
vidFramesOne = read(videoObjOne);
vidSize = size(vidFramesOne);

GMM = InitialiseGMM(vidSize(1), vidSize(2));

for t = 1:120
   currentFrame = vidFramesOne(:,:,:,t);
   
   currentFrameG = rgb2gray(currentFrame);
   
   currentFrameG = double(currentFrameG);
   
   [Foreground, Background, GMM] = RunGMM(currentFrameG,GMM);
   
   figure(1),subplot(2,3,1),imshow(uint8(currentFrameG)), title(['Frame: ', num2str(t)])
   subplot(2,3,2),imshow(uint8(Background)), title('Background')
   subplot(2,3,3),imshow(uint8(Foreground)), title('Foreground')
   drawnow
end