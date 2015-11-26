function [gaussianImage] = gaussianAttack(Im)
    %creates a gaussian filter
    filter = fspecial('gaussian', [3,3], 1.5) 
    %applies the filter
    gaussianImage = imfilter(Im,filter);
    %filter makes pixels a double, so this alleviates that issue
    gaussianImage = round(gaussianImage);
end

