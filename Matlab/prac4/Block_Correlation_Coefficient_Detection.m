% It should take an image, cover or watermarked one, and watermark pattern. It should
%generate correlation coefficient value as a returning parameter
function correlationCoefficient = Block_Correlation_Coefficient_Correlation(image, watermarkPattern)
    %convert to double
    image = double(image);
  
     %get image sizes
    imageSize = size(image);
    imageHeight = size(image, 1);
    imageWidth = size(image, 2);
    
    %get num blocks
    numBlocks = imageSize / [8 8];
    
    %clear watermark array??
    vo = zeros(8, 8);
    
        %Block wise scan the image and accumulate the pixel values in 8x8 blocks
    for i = 1:8:imageHeight
      for j = 1:8:imageWidth
        vo = vo + image(i:i+7,j:j+7);
      end
    end
    
    %normalise
    vo = vo / numBlocks;
    
    %generate coefficent
    correlationCoefficient = corr2(vo, watermarkPattern);
end