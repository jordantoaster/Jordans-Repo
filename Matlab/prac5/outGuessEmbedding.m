function [embeddedImage] = outGuessEmbedding(originalImage, message, seed)

    %divide into blocks and perform dct on each element in each block
    ImDCT = blkproc(originalImage,[8 8],@dct2);

     %quantisization of the double to int, 16 maintains the quality
    ImDCT = int16(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    message = reshape(message, [], 1);
    
    %generate random sequence
    rng('default');
    rng(seed, 'twister');
    %randomSequence = ImDCT(randperm(size(ImDCT,1)),:)
    N = numel(ImDCT);
    ri = randperm(N);
    randomSequence = ImDCT(ri)

    %iterates the image when 0 and 1 coeffients are skipped
    currVal = 1;

    for i = 1:size(message)
        
        %used to move through pixels that are 0 and 1
        %dont embed any 0 or 1
        while(randomSequence(currVal) == 0 || randomSequence(currVal) == 1) 
            %if 0 or 1  move onto next dct coefficent
            currVal = currVal + 1;      
        end   
        
        %get the current image dct lsb
        imageBit = bitget(randomSequence(currVal),1);
        
        %embed new pixel value with the one in the message if not equal
        if(imageBit ~= message(i))
            randomSequence(currVal) = bitset(randomSequence(currVal), 1, message(i));
        end
        
        %so we can move onto next dct
        currVal = currVal + 1;      
        
    end
    
    %unscrambling returns to original form not embedded form
    
    %reverses the scrambling of dct values
    [dum, iri] = sort(ri) % inverse
    unscrambled = randomSequence(iri)

    %checks if values are equal
    isequal(unscrambled, ImDCT)
     
    %reshape
    unscrambled = reshape(unscrambled, size(originalImage));
   
    %reverse dct
    embeddedImage = blkproc(unscrambled,[8 8],@idct2);  
    
    %to display convert output into image range of 0-255
    %embeddedImage = uint8(embeddedImage);      
    %figure, imshow(embeddedImage);
end

