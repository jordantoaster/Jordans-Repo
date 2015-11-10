%: It should take the cover (original) image, 2D watermark pattern, message
%bit ( 1 or 0) and strength parameter (alpha). The output should be the watermarked image
function wmIm = Block_Blind_Embedding(originalImage, watermarkPattern, messageBit, alpha)
    %convert to double
    originalImage = double(originalImage);
    
    %determine the message pattern using bit and wm pattern
    if(messageBit == 1)
        messagePattern = watermarkPattern;
    else
        messagePattern = -watermarkPattern;
    end
      
    %get image sizes
    imageSize = size(originalImage);
    imageHeight = size(originalImage, 1);
    imageWidth = size(originalImage, 2);
    
    %get num blocks
    numBlocks = imageSize / [8 8];
    
    %clear watermark array??
    vo = zeros(8, 8);
    
    %Block wise scan the image and accumulate the pixel values in 8x8 blocks
    for i = 1:8:imageHeight
      for j = 1:8:imageWidth
        vo = vo + originalImage(i:i+7,j:j+7);
      end
    end
    
    %normalise
    vo = vo / numBlocks;
    
    %Calculate the adding mark, vw, using the vo, alpha value and the watermark pattern
    wa = alpha * messagePattern;
    vw = vo + wa;
    
    %Initialise the watermark image, wmIm, using zeros() function with height and width of the
    %original image.
    wmIm = zeros(imageHeight, imageWidth);
    
    %Block wise scan the image and add the watermark in each block
    for i = 1:8:imageHeight
        for j = 1:8:imageWidth
            wmIm(i:i+7,j:j+7) = originalImage(i:i+7,j:j+7) + vw - vo;
        end
    end
    
    wmIm = uint8(wmIm);
end