%this function generates the watermark
function message = generateWatermark(Im)
    
    % msize should be equal or less than the image size. this generates a 1D vector
    % with random values between 0 and 1.0
    message = rand(round(size(Im))); 
    
    %To convert these numbers to binary, we get the indicies of nums < > 0
    x0 = find (message <= 0.5); 
    x1 = find (message > 0.5); 
    
    % Force them to 0 and 1
    message(x0) = 0;
    message(x1) = 1;
end
