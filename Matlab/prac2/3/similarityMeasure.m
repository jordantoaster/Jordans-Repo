% It should accept the original and extracted watermarks as input parameter. It
%should return an array showing the correlation coefficient values for a random watermark set
%including the extracted one.
function CorrCoef = similarityMeasure(originalWatermark, extractedWatermark)
    WmSize = size(originalWatermark,1);
    
    %inputs are single watermarks, this makes 1000
    WmArray = randn(WmSize,1000);
    WmArray (:, 250) = originalWatermark;
    normWm = sqrt( extractedWatermark' * extractedWatermark);
    
    %initialise correlation array
    CorrCoef = (size(extractedWatermark));    
    
    %in the loop calculate coefficeint for extracted watermark
    %against random (then normalised)
    for i = 1:1000
       CorrCoef(i) =(extractedWatermark' * WmArray(:,i)) / normWm;
    end
end