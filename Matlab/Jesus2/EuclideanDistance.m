function dEuc=EuclideanDistance(sample1, sample2)

total = 0;

for i=1:size(sample1, 2)
    total = total + (sample1(i)-sample2(i))^2;
end

%OR
%S = sqrt(sum((sample1 - sample2) .^ 2));
 
dEuc = sqrt(total);

end

