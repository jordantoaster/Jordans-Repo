function runProgram()

   %get image and convert to grayscale
   Im = imread('baboon256.bmp');
   Im = rgb2gray(Im); 

   %imwrite(Im, '1.jpg', 'jpeg');
   %Im = imread('1.jpg');
   
   %get 1d watermark
   watermark = generateWatermark(Im);

   jstegEmbeddedImage = jstegEmbedding(Im, watermark);
end