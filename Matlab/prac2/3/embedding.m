% It should take original image, watermark signal, strength parameter and the position of
%the first coefficient to be used in the embedding. The output should be the watermarked image.
function watermarkedImage = embedding(originalImage, watermarkSignal, strength, position)

    %Generate DCT coefficient matrix using Matlab’s DCT function.
    originalImage = double(originalImage);
    ImDCT = dct(originalImage);
    
    %Convert DCT matrix into 1D array using zigzag2dto1d.m
    ImDCT1d = zigzag2dto1d(ImDCT);
    
    %Extract the DCT coefficients to be embedded using the position information: 
    Coefs = ImDCT1d(position:position+size(watermarkSignal,1) - 1);
    
    %Perform embedding:
    ECoefs = Coefs.*(1 + strength * watermarkSignal);
    
    %Insert the embedded coefficients into the 1d coefficient array. 
    ImDCT1d( position : position+size(watermarkSignal,1) -1 ) = ECoefs;
    
    %Generate embedded DCT coefficient matrix using dezigzag1dto2d.m:
    EmbedDCT = dezigzag1dto2d( ImDCT1d );
    
    %Perform inverse DCT to obtain the watermarked image.
    watermarkedImage = idct(EmbedDCT);
    
    %convert to uint8
    watermarkedImage = uint8(watermarkedImage);  
end