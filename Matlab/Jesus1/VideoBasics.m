function VideoBasics()

%define file name and read the videos
fileNameOne = 'viptraffic.avi';
videoObjOne = VideoReader(fileNameOne);
fileNameTwo = 'shopping_center.mpg';
videoObjTwo = VideoReader(fileNameTwo);

%get the frames from each video
vidFramesOne = read(videoObjOne);
vidFramesTwo = read(videoObjTwo);

%get the data from the frames
sizeOne = size(vidFramesOne);
sizeTwo = size(vidFramesTwo);

%play the video
%implay(vidFramesOne, 5);
%implay(vidFramesTwo, 5);

%get the first frame from each video
frameOne = vidFramesOne(:,:,:,1);
frameTwo = vidFramesTwo(:,:,:,1);

%show the frames
imshow(frameOne);
imshow(frameTwo);

%shows each frame in the videos
%montage(vidFramesOne);
%montage(vidFramesTwo);


end
