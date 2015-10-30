%generates a PSNR fidelity measure for a watermarked image, compared to the
%original image.
function PSNR = FidelityMeasure(originalImage, watermarkImage)

%images then are converted to double format
originalImage = double(originalImage);
watermarkImage = double(watermarkImage);

%the MSE for the images is then calculated
MSE = sum( sum ( ( originalImage - watermarkImage ) .^ 2 ) );
MSE = MSE / size(originalImage,1) * size(watermarkImage,2);

%calculate the PSNR
PSNR = 10*log10(255^2 / MSE);
end