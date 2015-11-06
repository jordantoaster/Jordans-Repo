function [drc, dr0, dr1] = Detection_Rate(cac,ca0, ca1, threshold)
    % for m = 1
    x = find( ca1 > threshold );
    dr1 = size( x , 1 ) / 800;

    % for m = 0
    x = find( ca0 < -threshold ); 
    dr0 = size( x , 1 ) / 800;
    
    % for cover images
    x = find( (cac <= threshold ) & ( cac >= -threshold) );
    drc = size( x , 1 ) / 800;    
end