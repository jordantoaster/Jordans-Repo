function runProgram()

   %get image and convert to grayscale
   Im = imread('baboon256.bmp');
   Im = rgb2gray(Im); 
   
   %get message
   watermark = generateWatermark();

   jstegEmbeddedImage = jstegEmbedding(Im, watermark);
   
   outputMessage = decodeJsteg(jstegEmbeddedImage, watermark);
      
   plot(outputMessage);
end