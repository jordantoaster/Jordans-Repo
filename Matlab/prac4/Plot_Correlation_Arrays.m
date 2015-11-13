%plots the three input arrays
function Block_Blind_Embedding(cac, ca0, ca1)

         %generates histogram for each array
        [Nc, Xc] = hist( cac, 10 );
        [N1, X1] = hist( ca1, 10);
        [N0, X0] = hist( ca0, 10); 
        
        %plot hisotgrams
        figure, plot(Xc,Nc, 'Color',[0,0.1,0.9]);
        hold on
        plot(X1,N1, 'Color',[0,0.4,0.4]);
        plot(X0,N0, 'Color',[0,0.9,0.1]);
        legend('no watermark','m=1','m=0');
end