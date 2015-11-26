% a simple visual attack if the user has the cover and stego image
%can be used to check if info is hidden
function [] = diffImageVisualAttack(origImage, ModifiedImage )
    DifIm = abs( double(origImage) - double(ModifiedImage) );
    figure, imshow(120 * uint8(DifIm));
end

