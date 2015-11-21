%this has been created based on the algorithm in paper...[]

function embeddedImage =  jstegEmbedding(originalImage, message)

    originalImage = double(originalImage);
    
    %divide into blocks and perform dct on each element in each block
    ImDCT = blkproc(originalImage,[8 8],@dct2);
            
    %quantisization of the double to int
    ImDCT = uint8(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    message = reshape(message, [], 1);
    
    %iterates the image when 0 and 1 coeffients are skipped
    currVal = 1;
    
    %iterate each message bit
    for i = 1:size(message)
        %used to move through pixels that are 0 and 1
        %dont embed any 0 or 1
        while(ImDCT(currVal) ==0 || ImDCT(currVal) == 1) 
            %if 0 or 1  move onto next dct coefficent
            currVal = currVal + 1;      
        end

        %get the current image dct lsb
        imageBit = bitget(ImDCT(currVal),1);
        
        %embed new pixel value with the one in the message if not equal
        if(imageBit ~= message(i))
            ImDCT(currVal) = bitset(ImDCT(currVal), 1, message(i));
        end
        
        %so we can move onto next dct
        currVal = currVal + 1;      
    end
    
    %return to a 2d form
    ImDCT = reshape(ImDCT, size(originalImage));
    
    %reverse dct
    embeddedImage = blkproc(ImDCT,[8 8],@idct2);  
    
    %return to int8 format
   % embeddedImage = uint8(ImDCT);     
end