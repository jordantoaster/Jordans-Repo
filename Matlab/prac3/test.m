%used to test the lcc
function [cac, ca1, ca0] = test()

    watermarkPattern = Generate_2D_Watermark(480,480);
    
    %Iterate all images using a for loop:
    cac = zeros(800, 1);
    ca1 = zeros(800, 1);
    ca0 = zeros(800, 1);
    
    %Iterate all images using a for loop:
    for imNo = 1 : 800
        OrIm = imread( strcat(num2str( imNo ), '.bmp' ) );
        
        %Generate two watermarked images
        watermarkedImage = Blind_Embedding(OrIm,watermarkPattern,0, 1);
        watermarkedImage2 = Blind_Embedding(OrIm,watermarkPattern,1, 1);
        
        %Calculate three linear correlations
        correlation1 = Linear_Correlation(OrIm,watermarkPattern);
        correlation2 = Linear_Correlation(watermarkedImage,watermarkPattern);
        correlation3 = Linear_Correlation(watermarkedImage2,watermarkPattern);
        
        %Assign these three values into the current position of the appropriate arrays
        cac(imNo) = correlation1;
        ca0(imNo) = correlation2;
        ca1(imNo) = correlation3;
        
    end
    
        %experiment 2
        
        %generates histogram for each array
        [Nc, Xc] = hist( cac, 10 );
        [N1, X1] = hist( ca1, 10);
        [N0, X0] = hist( ca0, 10); 
        
        %plot hisotgrams
        figure, plot(Xc,Nc, 'Color',[0,0.1,0.9]);
        hold on
        plot(X1,N1, 'Color',[0,0.4,0.4]);
        plot(X0,N0, 'Color',[0,0.9,0.1]);
        
        %experiment 3/assessment - rate of each one detecting either 0,1 or
        %no paremeter
        [cacResults, ca0Results, ca1Results] = Detection_Rate(cac,ca0,ca1,1);
end