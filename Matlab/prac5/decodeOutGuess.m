function [message] = decodeOutGuess(originalImage, originalMessage, seed)

    %divide into blocks and perform dct on each element in each block
    ImDCT = blkproc(originalImage,[8 8],@dct2);

     %quantisization of the double to int, 16 maintains the quality
    ImDCT = int16(ImDCT);
        
    %make message and image 1d for easier processing
    ImDCT = reshape(ImDCT, [], 1);
    
    message=zeros(size(originalMessage));
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
        message(i) = bitget(randomSequence(currVal),1);
        
        %so we can move onto next dct
        currVal = currVal + 1; 
    end
        message = reshape(message, size(originalMessage));
end

