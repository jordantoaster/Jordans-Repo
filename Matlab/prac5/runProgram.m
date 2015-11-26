function runProgram()

   %get image and convert to grayscale
   Im = imread('baboon256.bmp');
   Im = rgb2gray(Im); 
   
   %get message
   watermark = generateWatermark();

   jstegEmbeddedImage = jstegEmbedding(Im, watermark);
   
   
   geometricAttackImage = geometricAttack(jstegEmbeddedImage);
   figure, imshow(geometricAttackImage);
   diffImageVisualAttack(Im, jstegEmbeddedImage);
   %jstegEmbeddedImage = gaussianAttack(jstegEmbeddedImage);
   
   f3EmbeddedImage = f3Embedding(Im, watermark);
      
   outputMessageTwo = decodeF3(f3EmbeddedImage, watermark);
   
   outputMessage = decodeJsteg(jstegEmbeddedImage, watermark);

      
   %figure, imshow();
end