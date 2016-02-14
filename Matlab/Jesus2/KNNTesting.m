function prediction = KNNTesting(testImage, modelNN, K)

%iterate the test images
for i=1:size(testImage, 2)  
    
    %assign to an index of distance the Euc distance based on test image
    %and row of the training image set (= an image)
    distance(i) = EuclideanDistance(testImage, modelNN.neighbours(i,:));
end

%sorts the results into ascending order & gets the index set as well
[ASorted, AIdx] = sort(distance);

%select the k amount of elements from the vectors (1 to k)
smallestNElements = ASorted(1:K);
smallestNIdx = AIdx(1:K);

%get the labels based on the index of the K lowest distances 
for i=1:3
   kLabels(i) =  modelNN.labels(smallestNIdx(i));
end

%V1 histogram voting attempt
%organise labels into histogram and get the bin counts
%[N,edges] = histcounts(kLabels);
%select the bmost frequenct bin (label with most votes)

%use mode to get the most frequent occuring label
prediction = mode(kLabels);

end

