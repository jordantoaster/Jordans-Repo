function belonging = belong2Gauss(distance, sd, threshold)

outcome = distance / sd;

if(outcome <= threshold)
    belonging = true;
else
    belonging = false;
end

end


