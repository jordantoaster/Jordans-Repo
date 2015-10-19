%accept image under the test (watermarked or attacked) and watermark size.
%The output should be the recovered watermark signal
function watermark = extractWatermark(imageUnderTest, watermarkSize)

    %initialise an empty watermakr container
    watermark = zeros(watermarkSize);
    
    %convert image to a vector
    imageUnderTest = reshape(imageUnderTest, [], 1);
    %convert watermark to a vector
    watermarkSize = reshape(watermarkSize, [], 1);
    
    %if LSB = 0 of image = 0 set 0 to the watermark, else set 1
    for i = 1:size(imageUnderTest);
        if(bitget(imageUnderTest(i),1) == 0)
            watermark(i) = 0;
        else
            watermark(i) = 1; 
        end
    end
end