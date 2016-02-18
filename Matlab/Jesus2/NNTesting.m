function prediction = NNTesting(testImage, modelNN)

%iterate the test images
for i=1:size(modelNN.neighbours, 1)  
    
    %assign to an index of distance the Euc distance based on test image
    %and row of the training image set (= an image)
    distance(i) = EuclideanDistance(testImage, modelNN.neighbours(i,:));
end

%get smallest distance and its index
[minDistance, distanceIndex] = min(distance);

%assign the min distance label from model to the result.
prediction = modelNN.labels(distanceIndex);

end

