package StatisticsR;


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
}
