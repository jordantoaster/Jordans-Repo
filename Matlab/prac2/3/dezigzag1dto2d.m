% % De-zig-zag of 1D vector into 2D array

% % INPUT
% % Z: 1D zig-zag vector

% % OUTPUT
% % A: 2D array, restored from 1D zig-zag vector to original pattern

function A=dezigzag1dto2d(Z)

Z = Z';

ind = zigzag4(sqrt(length(Z))); 

A=[];
for k=1:length(Z)
    A( ind(k,1),ind(k,2) )=Z(k);
end    

% % This program or any other program(s) supplied with it do not provide
% % any warranty direct or implied. This program is free to use for
% % non-commerical purpose only. For any other usage contact with author.
% % Kindly reference the author.
% % Thanking you.
% % @ Copyright M Khan
% % Email: mak2000sw@yahoo.com 
% % http://www.geocities.com/mak2000sw/
