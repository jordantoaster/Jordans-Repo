function [bkg] = bckGenerator(videoStream, sampling)

%holds the 
buffer=[];

%counts the amount of samples
counter=0;

%start at 1, go to the sampling value provided then enter loop - continue
%until completed
for t = 1:sampling:size(videoStream,4)
    
counter=counter+1;

%add each frame at sample to buffer
buffer(:,:,counter)= double(rgb2gray(videoStream(:,:,:,t)));

end

%3 indicates median applied over time dimension not row or column
%goal is to filter away the movement and reveal the background
bkg = median(buffer,3);

end

