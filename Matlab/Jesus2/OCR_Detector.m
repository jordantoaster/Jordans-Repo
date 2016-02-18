clear all
close all

%We load the classification model of our choice
load detectorModel

%Open testing image and convert to gary scale
I=imread('digitrecognition1.jpg');
I=rgb2gray(I);
imshow(I)

%For simplifying this task, we will assume we know that there are 5 rows of
%sigits, with 10 numbers each
numberRows=5;
numberColumns=10;

%Using previous infromation, we can calculate how tall and wide is each
%digit
samplingX=round(size(I,1)/numberRows);
samplingY=round(size(I,2)/numberColumns);

figure
digitCounter=0;

%Implementation of a simplified slidding window
% we will be accumulating all the predictions in this variable
predictedFullImage=[];

%V1 for loops
%for each digit within the image, 
%for r=1:samplingX:size(I,1)
 %   predictedRow=[];
  % for c= 1:samplingY:size(I,2)
  
%V2 Loops - basically changes the sampling to hard code and adds counts for
% x and y
county=0;
for r=1:5:size(I,1)
    predictedRow=[];
    county=county+1;
    countx=0;
    for c= 1:5:size(I,2)
    countx=countx+1;
        
        if (c+samplingY-1 <= size(I,2)) && (r+samplingX-1 <= size(I,1))
      
        digitCounter =digitCounter+1;
        
        %we crop the digit
        digitIm = I(r:r+samplingX-1, c:c+samplingY-1);
        
        % we convert it into doubles from 0 to 1 and invert them (rememebr that in the training set, the digitd were white on black background)
        digitIm = im2double(digitIm)>0.5; %> 0.5 sets to binary based on a threshold 0.5
        digitIm = ~digitIm;
        
        %All training examples were 28x28. To have any chance, we need to
        %resample them into a 28x28 imaGE
        digitIm = imresize(digitIm, [28,28]);
        
        
        %We display teh individually segmented digits
        subplot(samplingX,samplingY,digitCounter)
        imshow(digitIm)
        
        %preprocess - Turn off for V2
        digitIm = preprocessDigit(digitIm);
        
        %we reshape the digit into a vector
        digitIm = reshape(digitIm,1,[]); 
        
        %add chosen test method here
        prediction = SVMTesting(digitIm,modelSVM);
      
        predictedRow=[predictedRow prediction];
        end
        %c
    end
    %r
    predictedFullImage=[predictedFullImage; predictedRow];
end

predictedFullImage

%% Evaluation
%Groundtruth
solutionTruth = [7 2 1 0 4 1 4 9 5 9;...
                 0 6 9 0 1 5 9 7 3 4;...
                 9 6 6 5 4 0 7 4 0 1;...
                 3 1 3 4 7 2 7 1 2 1;...
                 1 7 4 2 3 5 1 2 4 4];
             
comparison = (predictedFullImage==solutionTruth);
Accuracy = sum(sum(comparison))/ (size(comparison,1)*size(comparison,2))
