package StatisticsR;


import java.util.ArrayList;

import org.rosuda.REngine.REXP;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import org.rosuda.REngine.RList;
import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;

public class RConnectionDarwin {
	
	public String mean(int[] dataSubset) throws REngineException, REXPMismatchException {
				
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            //String vector = "c(1,2,3,4)";
            connection.assign("vector", dataSubset);
			REXP x = connection.eval("mean(vector)");
			System.out.println(x.asInteger());
			
			int result = x.asInteger();
			String parsedResult = Integer.toString(result);

            //connection.eval("meanVal=mean(vector)");
           // double mean = connection.eval("meanVal").asDouble();
            //System.out.println("The mean of given vector is=" + mean);       
            //String convertedMean = Double.toString(mean);
            
            connection.close();
            
            return parsedResult;
            
        } catch (RserveException e) {
            e.printStackTrace();
        }  
        
        connection.close();
        
		return "";
    }


	// payload - element data - choose index - payload to get value
	//check for index names in attribute part of object
	//2 p value
	//3 is the correlation
	//6 - method
	public String[] correlation(int[] data, int[] dataTwo) throws REngineException, REXPMismatchException {
		
		RConnection connection = null;
        String[] corrResults = new String[4];
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();
            
            //assign vectors
            connection.assign("vectorA", data);
            connection.assign("vectorB", dataTwo);
            
            //get REXP data
            REXP pValP = connection.eval("cor.test(vectorA, vectorB)$p.value");
            REXP pValS = connection.eval("cor.test(vectorA, vectorB, method='spearman')$p.value");
            REXP pCorr = connection.eval("cor(vectorA, vectorB)");
			REXP sCorr = connection.eval("cor(vectorA, vectorB, method='spearman')");
			
            corrResults[0] = Double.toString(pCorr.asDouble());
            corrResults[1] = Double.toString(sCorr.asDouble());
            corrResults[2] = Double.toString(pValP.asDouble());
            corrResults[3] = Double.toString(pValS.asDouble());

            connection.close();
            
            return corrResults;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        }  
        
        connection.close();
		
		return corrResults;
	}
	
	public String[] wilks(int[] dataSubset) throws REngineException, REXPMismatchException {
		RConnection connection = null;
        String[] wilksResults = new String[4];

        try {

            connection = new RConnection();

            connection.assign("vectorA", dataSubset);
			REXP wilksP = connection.eval("shapiro.test(vectorA)$p.value");
			REXP wilks = connection.eval("shapiro.test(vectorA)$statistic");
			
			wilksResults[0] = Double.toString(wilks.asDouble());
			wilksResults[1] = Double.toString(wilksP.asDouble());

            connection.close();
            
            return wilksResults;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        }  
        
        connection.close();		
        
		return null;
	}

	public String standardDev(int[] means) throws REngineException, REXPMismatchException {
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vectorA", means);
			REXP x = connection.eval("sd(vectorA)");
			System.out.println(x.asDouble());
			
			double result = x.asDouble();
			String parsedResult = Double.toString(result);

            connection.close();
            
            return parsedResult;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        }  
        
        connection.close();		
        
        return null;
	}

}
