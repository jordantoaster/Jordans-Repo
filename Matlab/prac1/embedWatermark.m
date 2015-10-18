%accepts original image and watermark message. The output should be a
%watermarked image.
function watermarkedImage = embedWatermark(originalImage, watermarkMessage)
    
    %get dimensions of the image
    imageRows = size(originalImage,1);
    imageColumns = size(originalImage,2);
    
    %convert watermark to 2d matrix
    originalImage = reshape(originalImage, [], 1);
    watermarkedImage = size(originalImage);
    a = originalImage;
    
    %check if watermark is smaller than image
    if(size(watermarkMessage) <= size(originalImage, 1))
        for i = 1:size(watermarkMessage);
            %if bits not equal change to wm message bit
            if(bitget(originalImage(i),1) ~=  watermarkMessage(i))
                %if value = 1 apply a different function than if value = 0
                %(stops an error, matlab quirk?)
                if(watermarkMessage(i) == 1)
                   %do i need to do originalImage = ...
                   d = bitget(originalImage(i),1);
                   %this always sets the whole pixel to 1...why?
                   originalImage(i) = bitset(originalImage(i), 1);
                   d = bitget(originalImage(i),1);
                else
                    originalImage(i) = bitset(originalImage(i), bitget(originalImage(i),1), watermarkMessage(i));
                end
                
                watermarkedImage(i) = originalImage(i);
            else
                %populate watermarked image
                watermarkedImage(i) = originalImage(i);
            end
        end
    else
        errordlg('watermark is greater than image size')
    end 
    
    originalImage = reshape(originalImage, [imageRows,imageColumns]);
end