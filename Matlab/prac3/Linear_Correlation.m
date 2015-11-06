% It should take an image, cover or watermarked one, and watermark pattern. It
%should generate linear correlation value as a returning parameter.
function linearCorrelation = Linear_Correlation(image,watermarkPattern)
    image = double(image);
    
    %this?
    imageSize = size(image,1) * size(image,1);   
    
    %get linear correlation
    linearCorrelation = sum(sum(image .* watermarkPattern))/imageSize;
end