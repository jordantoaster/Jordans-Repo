Im = imread('baboon256.bmp');
Im = rgb2gray(Im);
watermark = generateWatermark(Im);
watermarkedImage = embedWatermark(Im, watermark);