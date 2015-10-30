%It should take image under the test (watermarked or attacked), original image,
%watermark size, strength parameter and the position of the first coefficient to be used in the
%embedding. The output should be the recovered watermark signal
function watermarkedSignal = extracting(imageUnderTest, originalImage, size, strength, position)
   
    %convert both images to the double format
    originalImage = double(originalImage);
    imageUnderTest = double(imageUnderTest);

    %calculate DCT of both images
    ImDCTOriginal = dct(originalImage); 
    ImDCTTest = dct(imageUnderTest);
    
    %perform zigzag operation on both DCT sets
    ImDCT1dOriginal = zigzag2dto1d(ImDCTOriginal);
    ImDCT1dTest = zigzag2dto1d(ImDCTTest);

    %extract coefficents according to position
    CoefsOriginal = ImDCT1dOriginal(position:position+size - 1);
    CoefsTest = ImDCT1dTest(position:position+size - 1);
    
    %extract the watermark signal
    watermarkedSignal = ( CoefsTest - CoefsOriginal ) ./ ( strength * CoefsOriginal);
end