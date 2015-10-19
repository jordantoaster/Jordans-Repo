% accept original and extracted watermarks as input parameters. It
%should return the calculated bit error rate
function measure = bitRateError(originalWatermark, extractedWatermark)
    
    %get sizes of both watermarks
    oWmSize = size(originalWatermark);
    eWmSize = size(extractedWatermark);
    
    %intialise total error variable
    totalError = 0;
    
    %check if watermarks lengths match (something went wrong if they are
    %not)
    if(oWmSize ~= eWmSize)
        errordlg('watermark lengths do not match');
        totalError = 0.0;
    else
        originalWatermark = reshape(originalWatermark, [], 1);
        extractedWatermark = reshape(extractedWatermark, [], 1);
        
        for i = 1:oWmSize; 
            if(originalWatermark(i) ~= extractedWatermark(i));
                totalError = totalError + 1;
            end
        end
        watermarkBase10Size = size(originalWatermark,1);
        measure = totalError / watermarkBase10Size;
    end   
end