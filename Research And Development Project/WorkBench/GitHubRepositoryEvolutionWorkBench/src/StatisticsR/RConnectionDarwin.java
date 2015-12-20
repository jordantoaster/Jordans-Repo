package StatisticsR;

import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;

public class RConnectionDarwin {
	
	public  int[] mean(String a[]) {
		
		RConnection connection = null;
		 
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            String vector = "c(1,2,3,4)";
            connection.eval("meanVal=mean(" + vector + ")");
            double mean = connection.eval("meanVal").asDouble();
            System.out.println("The mean of given vector is=" + mean);
        } catch (RserveException e) {
            e.printStackTrace();
        } catch (REXPMismatchException e) {
            e.printStackTrace();
        }  
        
        connection.close();
        
		return null;
    }
}
