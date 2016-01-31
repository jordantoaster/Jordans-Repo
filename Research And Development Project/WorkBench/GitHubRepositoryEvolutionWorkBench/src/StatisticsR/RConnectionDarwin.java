package StatisticsR;


import java.util.ArrayList;

import org.rosuda.REngine.REXP;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
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


	public String pearsonCorr(int[] data, int[] dataTwo) throws REngineException, REXPMismatchException {
		
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vectorA", data);
            connection.assign("vectorB", dataTwo);
			REXP x = connection.eval("cor(vectorA, vectorB)");
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
		
		return "Could not calculate";
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
