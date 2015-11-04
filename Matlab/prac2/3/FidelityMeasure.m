%generates a PSNR fidelity measure for a watermarked image, compared to the
%original image.
function PSNR = FidelityMeasure(originalImage, watermarkImage)

%images then are converted to double format
originalImage = double(originalImage);
watermarkImage = double(watermarkImage);

%calculate MSE
N = numel(originalImage); 
MSE = sum(sum((originalImage-watermarkImage).^2)) / N; 

%calculate PSNR
PSNR = 10*log10((255^2)/MSE);
end