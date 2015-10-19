%applies a gaussian filter to the speceified imahe
function gaussianImage = applyFilter(unfilteredImage)
    %creates a gaussian filter
    filter = fspecial('gaussian', [3,3], 1.5) 
    %applies the filter
    gaussianImage = imfilter(unfilteredImage,filter);
    %filter makes pixels a double, so this alleviates that issue
    gaussianImage = round(gaussianImage);
end
