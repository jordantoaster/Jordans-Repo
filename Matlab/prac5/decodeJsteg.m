%values when changed to dct have changed from what they should be

function [message] = decodeJsteg(Im, origMessage)

    %Im = double(Im);

    %divide into blocks and perform dct on each element in each block
    ImDCT = blkproc(Im,[8 8],@dct2);
            
    %quantisization of the double to int
    ImDCT = uint8(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    
    %iterates the image when 0 and 1 coeffients are skipped
    currVal = 1;
    
    %initialise message
    message=zeros(size(origMessage));
    message = reshape(message, [], 1);
    
    %iterate each message bit
    for i = 1:size(message)

        while(ImDCT(currVal) ==0 || ImDCT(currVal) == 1) 
            currVal = currVal + 1;      
        end

        %get the current image dct lsb
        message(i) = bitget(ImDCT(currVal),1);
        
        %so we can move onto next dct
        currVal = currVal + 1;      
    end
        message = reshape(message, size(origMessage));
end

