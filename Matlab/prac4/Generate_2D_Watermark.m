%It should take the sizes of 2D watermark pattern which is the same as
%those of original image. In this practical class we use images having sizes of 480-by-480. The output
%should be the 2D watermark pattern.
function TwoDWatermark = Generate_2D_Watermark(width,height)
     TwoDWatermark = randn( width, height);
     TwoDWatermark = TwoDWatermark -mean2(TwoDWatermark);
     TwoDWatermark = TwoDWatermark / std2(TwoDWatermark);
end