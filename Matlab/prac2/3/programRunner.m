%load the image and convrt to grayscale
Im = imread('baboon256.bmp');
Im = rgb2gray(Im); 
MyWatermark = randn(1000,1);

%Embedding: It should take original image, watermark signal, strength parameter and the position of
%the first coefficient to be used in the embedding. The output should be the watermarked image.
watermarkImage1 = embedding(Im, MyWatermark, 0.1, 2);
watermarkImage2 = embedding(Im, MyWatermark, 0.5, 2);
watermarkImage3 = embedding(Im, MyWatermark, 1, 2);
watermarkImage4 = embedding(Im, MyWatermark, 0.5, 10);
watermarkImage5 = embedding(Im, MyWatermark, 0.5, 100);
watermarkImage6 = embedding(Im, MyWatermark, 0.5, 1000);

%show all embedded images
%figure, imshow(watermarkImage1);
%figure, imshow(watermarkImage2);
%figure, imshow(watermarkImage3);
%figure, imshow(watermarkImage4);
%figure, imshow(watermarkImage5);
%figure, imshow(watermarkImage6);

%show difference images 
%DifIm = abs( double(Im) - double(watermarkImage1) );
%figure, imshow(10 * uint8(DifIm)), title('alpha:0.1 Position:2');
%DifIm = abs( double(Im) - double(watermarkImage2) );
%figure, imshow(10 * uint8(DifIm)), title('alpha:0.5 Position:2');
%DifIm = abs( double(Im) - double(watermarkImage3) );
%figure, imshow(10 * uint8(DifIm)), title('alpha:1 Position:2');
%DifIm = abs( double(Im) - double(watermarkImage4) );
%figure, imshow(10 * uint8(DifIm)), title('alpha:0.5 Position:10');
%DifIm = abs( double(Im) - double(watermarkImage5) );
%figure, imshow(10 * uint8(DifIm)), title('alpha:0.5 Position:100');
%DifIm = abs( double(Im) - double(watermarkImage6) );
%figure, imshow(10 * uint8(DifIm)), title('alpha:0.5 Position:1000');

%get PSNR values for each image
PSNR1 = Peak_SNR(Im, watermarkImage1);
PSNR2 = Peak_SNR(Im, watermarkImage2);
PSNR3 = Peak_SNR(Im, watermarkImage3);
PSNR4 = Peak_SNR(Im, watermarkImage4);
PSNR5 = Peak_SNR(Im, watermarkImage5);
PSNR6 = Peak_SNR(Im, watermarkImage6);

watermarkSignal1 = extracting(watermarkImage1, Im, size(MyWatermark,1), 0.1, 2);
watermarkSignal2 = extracting(watermarkImage2, Im, size(MyWatermark,1), 0.5, 2);
watermarkSignal3 = extracting(watermarkImage3, Im, size(MyWatermark,1), 1, 2);
watermarkSignal4 = extracting(watermarkImage4, Im, size(MyWatermark,1), 0.5, 10);
watermarkSignal5 = extracting(watermarkImage5, Im, size(MyWatermark,1), 0.5, 100);
watermarkSignal6 = extracting(watermarkImage6, Im, size(MyWatermark,1), 0.5, 1000);

%subsitute for original watermark, for future compare of 
%correlation coefficient array, seen in experiment three
DifferentWatermark = randn(1000,1);

%gets all the correlation coeffiecents - original watermark.
correlationCoef1 = similarityMeasure(MyWatermark, watermarkSignal1);
correlationCoef2 = similarityMeasure(MyWatermark, watermarkSignal2);
correlationCoef3 = similarityMeasure(MyWatermark, watermarkSignal3);
correlationCoef4 = similarityMeasure(MyWatermark, watermarkSignal4);
correlationCoef5 = similarityMeasure(MyWatermark, watermarkSignal5);
correlationCoef6 = similarityMeasure(MyWatermark, watermarkSignal6);

%gets all the correlation coeffiecents - different watermark.
correlationCoef1Diff = similarityMeasure(DifferentWatermark, watermarkSignal1);
correlationCoef2Diff = similarityMeasure(DifferentWatermark, watermarkSignal2);
correlationCoef3Diff = similarityMeasure(DifferentWatermark, watermarkSignal3);
correlationCoef4Diff = similarityMeasure(DifferentWatermark, watermarkSignal4);
correlationCoef5Diff = similarityMeasure(DifferentWatermark, watermarkSignal5);
correlationCoef6Diff = similarityMeasure(DifferentWatermark, watermarkSignal6);

%plot the correlation coeffecient as a graph - original watermark
%figure, plot(correlationCoef1), title('alpha:0.1 Position:2');
%figure, plot(correlationCoef2), title('alpha:0.5 Position:2');
%figure, plot(correlationCoef3), title('alpha:1 Position:2');
%figure, plot(correlationCoef4), title('alpha:0.5 Position:10');
figure, plot(correlationCoef5), title('alpha:0.5 Position:100');
figure, plot(correlationCoef6), title('alpha:0.5 Position:1000');

%plot the correlation coeffecient as a graph - different watermark
%figure, plot(correlationCoef1Diff), title('alpha:0.1 Position:2');
%figure, plot(correlationCoef2Diff), title('alpha:0.5 Position:2');
%figure, plot(correlationCoef3Diff), title('alpha:1 Position:2');
%figure, plot(correlationCoef4Diff), title('alpha:0.5 Position:10');
figure, plot(correlationCoef5Diff), title('alpha:0.5 Position:100');
figure, plot(correlationCoef6Diff), title('alpha:0.5 Position:1000');

%2 ANSWERS
%The stronger it is the more it can withstand changes to original WM
%using original wm, position 240 is always visible, diff loses it
%in orig wm as pos increases the correlation values decrease
%in diff wm, as pos increases the correlation values are consistent