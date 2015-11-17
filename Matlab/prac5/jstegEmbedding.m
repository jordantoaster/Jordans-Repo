function embeddedImage =  jstegEmbedding(originalImage, message)

    figure, imshow(originalImage);

    %Generate DCT coefficient matrix using Matlab’s DCT function.
    originalImage = double(originalImage);
    ImDCT = dct(originalImage);
    
  %  fun = @dct2;
   % ImDCT = blkproc(originalImage,[8 8],fun);
            
    %quantisization of the double to int
    ImDCT = uint8(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    message = reshape(message, [], 1);

    %iterate each message bit
    for i = 1:size(message)
        %dont embed any 0 or 1
        if(ImDCT(i) ~=0 && ImDCT(i) ~= 1)
                % get next bit
                currBit = bitget(message(i),1);
                if(currBit ~= -1)  %else return unadjusted dct value
                    
                    %get the current image pixel lsb
                    imageBit = bitget(ImDCT(i),1);

                    %overwrite the lsb
                    ImDCT(i) = bitset(ImDCT(i), 1, bitand(imageBit, 0));

                    %with this bit
                    result = bitor(bitget(ImDCT(i),1), currBit);
                    ImDCT(i) = bitset(ImDCT(i), 1, result);
                end           
        end               
    end
    
    %return to a 2d form
    ImDCT = reshape(ImDCT, size(originalImage));
    
    %reverse dct
    embeddedImage = idct(double(ImDCT));  
    
    %return to int8 format
    embeddedImage = uint8(embeddedImage);  
    
    figure, imshow(embeddedImage);
end