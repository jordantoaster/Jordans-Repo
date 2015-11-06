% It should take the cover (original) image, 2D watermark pattern, message bit ( 1 or
%0) and strength parameter (alpha). The output should be the watermarked image.
function watermarkedImage = Blind_Embedding(originalImage,watermarkPattern, messageBit, alpha)
    originalImage = double(originalImage);
    
    if(messageBit == 1)
        messagePattern = watermarkPattern;
    else
        messagePattern = -watermarkPattern;
    end
    
    watermarkedImage = originalImage + (alpha * messagePattern);
    
    watermarkedImage =  uint8(watermarkedImage);
end