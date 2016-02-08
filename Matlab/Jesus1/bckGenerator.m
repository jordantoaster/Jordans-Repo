function [bkg] = bckGenerator(videoStream, sampling)

buffer=[];
counter=0;

%get frames of the video
%vidFramesOne = read(videoStream);

%start at 1, at each iteration increment c by value of sampling, end at
%last frame of video
for t = 1:sampling:size(videoStream,4)
    
counter=counter+1;
%add each frame at sample to buffer
buffer(:,:,counter)= double(rgb2gray(videoStream(:,:,:,t)));

end

%3 indicates median applied over time dimension not row or column
bkg = median(buffer,3);

end

