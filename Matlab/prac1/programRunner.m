%Choose image input
Im = imread('baboon256.bmp');
%Im = imread('polarbear512.bmp');
Im = rgb2gray(Im);

%this image is already grayscale so wont need conversion
%Im = imread('rice.png');      

%get watermark
watermark = generateWatermark(Im);

%embed watermark
watermarkedImage = embedWatermark(Im, watermark);

%attack image here
watermarkedImage = applyFilter(watermarkedImage);

%save the new image
imwrite(watermarkedImage, 'watermarkImage.bmp','bmp');

%shows difference image
%DifIm = abs( double(Im) - double(watermarkedImage) );

%PSNR atained for each image using function
%smooth image will have a lowe PSNR score, due to greater distortion
%PSNR = Fidelity_Measure(Im, watermarkedImage);
PSNR = Peak_SNR(Im, watermarkedImage);

%extracts the watermark from watermarked image
extractedWatermark = extractWatermark(watermarkedImage, size(watermarkedImage));

%gets the bit rate error for the specified watermarks
BRE = bitRateError(watermark, extractedWatermark);

