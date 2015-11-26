function [embeddedImage] = f3Embedding(originalImage, message )

    %divide into blocks and perform dct on each element in each block
    ImDCT = blkproc(originalImage,[8 8],@dct2);

     %quantisization of the double to int, 16 maintains the quality
    ImDCT = int16(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    message = reshape(message, [], 1);
    
    %iterates the image when 0 and 1 coeffients are skipped
    currVal = 1;
    
    %iterate each message bit
    for i = 1:size(message)
        
        %dont embed any 0
        while(ImDCT(currVal) ==0) 
            %if 0 move onto next dct coefficent
            currVal = currVal + 1;      
        end
        
        %get absolute value of the coefficient
        absoluteValue = abs(ImDCT(currVal));
        
        %get lsb of abs value to compare with message
        %should this be the abs lsb not the curr dct???
        lsb =  bitget(absoluteValue,1);
        
        %if abs != message
        if(lsb ~=  message(i))
            
            %decrement abs value
            absoluteValue = absoluteValue -1;
            
            %inserts new abs value in coeffient
            ImDCT(currVal) = absoluteValue;
        end

        %handle shrinkage by re-embedding the message bit if new dct =0
        if(ImDCT(currVal) == 0)
            %forces loop to use the same message bit
            i = i -1;
        end
        
        %move onyo next dct
        currVal = currVal + 1;     
    end
    
      %return to a 2d form
    ImDCT = reshape(ImDCT, size(originalImage));
        
    %reverse dct
    embeddedImage = blkproc(ImDCT,[8 8],@idct2);  
    
    %to display convert output into image range of 0-255
    %embeddedImage = uint8(embeddedImage);      
    %figure, imshow(embeddedImage);
end

