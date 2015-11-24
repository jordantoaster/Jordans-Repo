%the message is only ever compared for equality with the abs value, never
%directly embedded, so we can extract the modified dct values but not the
%message???

function [message] = decodeF3(Im, origMessage)
    
    %divide into blocks and perform dct on each element in each block
    ImDCT = blkproc(Im,[8 8],@dct2);
            
    %quantisization of the double to int
    ImDCT = int16(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    
    %iterates the image when 0 and 1 coeffients are skipped
    currVal = 1;
    
    %initialise message
    message=zeros(size(origMessage));
    message = reshape(message, [], 1);
    
    %iterate each message bit
    for i = 1:size(message)
        
        %dont embed any 0
        while(ImDCT(currVal) ==0) 
            %if 0 move onto next dct coefficent
            currVal = currVal + 1;      
        end
        
        %populate message
        message(i) =  abs(ImDCT(currVal));
        currVal = currVal + 1;     
    end
    
    message = reshape(message, size(origMessage));
end

