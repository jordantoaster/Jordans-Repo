% % JPEG like zig-zag scan of 2D array of size N-by-N into 1D vector
% % INPUT
% % A: 2D array of size N-by-N
% % OUTPUT
% % Z: 1D vector of size 1-by-N^2, that holds zig-zag values of A

function Z=zigzag2dto1d(A)

[r,c]=size(A);

if r~=c
    error('input array should have equal number of rows and columns')
end

ind = zigzag4(r); 
Z=[];
for k=1:size(ind,1)
    Z=horzcat(Z, A(ind(k,1),ind(k,2)) ) ;
end

Z = Z';

% % This program or any other program(s) supplied with it do not provide
% % any warranty direct or implied. This program is free to use for
% % non-commerical purpose only. For any other usage contact with author.
% % Kindly reference the author.
% % Thanking you.
% % @ Copyright M Khan
% % Email: mak2000sw@yahoo.com 
% % http://www.geocities.com/mak2000sw/
