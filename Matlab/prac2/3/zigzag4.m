% zigzag4 - generate traversal-through-matrix used by jpeg
%
% SYNOPSIS
%	zigzag4
%	zigzag4(N)
%
% DESCRIPTION
% 	The skew-diagonal-traversal-pattern of jpeg for an NxN matrix
%	is returned in an N^2x2 matrix. N defaults to 8. The N^2x2 matrix
%	contains the appropriate row and column indices (starting at 1).

% Copyright (C) 1995-1997 Darrel Hankerson and Greg A. Harris
%
% This file is part of the JPEGtool collection of scripts for Octave
% and Matlab; see http://www.dms.auburn.edu/compression
%
% The JPEGtool collection is free software; you can redistribute it
% and/or modify it under the terms of the GNU General Public License
% as published by the Free Software Foundation; either version 2, or
% (at your option) any later version.
%
% The collection is distributed in the hope that it will be useful,
% but WITHOUT ANY WARRANTY; without even the implied warranty of
% MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
% GNU General Public License for more details.
%
% You should have received a copy of the GNU General Public License
% along with this package; see the file COPYING.  If not, write to the
% Free Software Foundation, 59 Temple Place - Suite 330, Boston, MA
% 02111-1307, USA.

function Z = zigzag4(N)

if ~exist('N')
  N = 8;
end

Z = zeros(N*N,2);
u = 0; v = 2; inc = 1;

for n = 1:N*N
  v = v - inc; u = u + inc;
  if (u > N)
    v = v + 2; u = N; inc = -1;
  elseif (v == 0)
    v = 1; inc = -1;
  elseif (v > N)
    u = u + 2; v = N; inc = 1;
  elseif (u == 0)
    u = 1; inc = 1;
  end
  Z(n,:) = [v u];
end

% % Referecnce
% % http://www.site.uottawa.ca/~edubois/courses/CEG4311/zigzag.m