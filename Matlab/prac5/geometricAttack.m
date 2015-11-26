%performs geometric alterations to the image
function attackedImage = geometricAttack(Image)
    attackedImage = imrotate(Image, 50);
    attackedImage = imresize(attackedImage,0.25)
end

