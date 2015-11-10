%used to test the lcc
function [cac, ca1, ca0] = test()

    %generate watermark
    watermarkPattern = Generate_2D_Watermark(8,8);
    
    %initialise arrays
    cac = zeros(800, 1);
    ca1 = zeros(800, 1);
    ca0 = zeros(800, 1);
    
    %Iterate all images using a for loop:
    for imNo = 1 : 800
        OrIm = imread( strcat(num2str( imNo ), '.bmp' ) );
        
        %Generate two watermarked images
        watermarkedImage = Block_Blind_Embedding(OrIm,watermarkPattern,0, 1);
        watermarkedImage2 = Block_Blind_Embedding(OrIm,watermarkPattern,1, 1);
               
        %Calculate three linear correlations coefficents
        correlation1 = Block_Correlation_Coefficient_Detection(OrIm,watermarkPattern);
        correlation2 = Block_Correlation_Coefficient_Detection(watermarkedImage,watermarkPattern);
        correlation3 = Block_Correlation_Coefficient_Detection(watermarkedImage2,watermarkPattern);
        
        %Assign these three values into the current position of the appropriate arrays
        cac(imNo) = correlation1;
        ca0(imNo) = correlation2;
        ca1(imNo) = correlation3;
    end
    
    Plot_Correlation_Arrays(cac, ca0, ca1);
    
    %experiment 3/assessment - rate of each one detecting either 0,1 or
    %no paremeter
    [cacResults, ca0Results, ca1Results] = Detection_Rate(cac,ca0,ca1,0.2);
end