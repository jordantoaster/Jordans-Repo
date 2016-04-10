/**
 * @author Jordan McDonald
 *
 * Description - Class which hanldes the various functionality that is required from the R environment
 * The java process connects to R via Rserve in all instances which responds with the results
 * The connection is always open and closed during each function to prevent conflict with the tomcat server
 */

package StatisticsR;

import java.util.Arrays;
import org.rosuda.REngine.REXP;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;

public class RConnectionDarwin {
	
	//gets the mean value from a passed in data series - integer case
	public String mean(int[] dataSubset) throws REngineException, REXPMismatchException {
				
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vector", dataSubset);
			REXP x = connection.eval("mean(vector)");
			
			int result = x.asInteger();
			String parsedResult = Integer.toString(result);
            
            connection.close();
            
            return parsedResult;
            
        } catch (RserveException e) {
            e.printStackTrace();
        }  
        
        connection.close();
        
		return "";
    }
	
	//an overloaded function getting the mean for the double case
	public double mean(double[] dataSubset) throws REngineException, REXPMismatchException {
		
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vector", dataSubset);
			REXP x = connection.eval("mean(vector)");
			
			double result = x.asDouble();
            
            connection.close();
            
            return result;
            
        } catch (RserveException e) {
            e.printStackTrace();
        }  
        
        connection.close();
        
		return 0; //if failed return placeholder
    }
	
	//using R the median value is returned from the data series
	public double median(double[] dataSubset) throws REngineException, REXPMismatchException {
		
		RConnection connection = null;
		
		Arrays.sort(dataSubset);
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vector", dataSubset);
			REXP x = connection.eval("median(vector)");
			
			double result = x.asDouble();
            
            connection.close();
            
            return result;
            
        } catch (RserveException e) {
            e.printStackTrace();
        }  
        
        connection.close();
        
		return 0;
    }
	
	//overloaded method handling the case where the series is of type int
	public int median(int[] dataSubset) throws REngineException, REXPMismatchException {
		
		RConnection connection = null;
		
		Arrays.sort(dataSubset);
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vector", dataSubset);
			REXP x = connection.eval("median(vector)");
			
			int result = x.asInteger();
            
            connection.close();
            
            return result;
            
        } catch (RserveException e) {
            e.printStackTrace();
        }  
        
        connection.close();
        
		return 0;
    }

	//performs correlations - pearson, spearmann + p values & returns as an array of values
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
	
	//performs shapiro wilks normality test + gets p value
	public String[] wilks(int[] dataSubset) throws REngineException, REXPMismatchException {
		RConnection connection = null;
        String[] wilksResults = new String[2];

        if(dataSubset.length > 52)
        	dataSubset = Arrays.copyOfRange(dataSubset, 26, dataSubset.length);

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

	//gets the standard deviation for a series of data (numerical values)
	public String standardDev(int[] means) throws REngineException, REXPMismatchException {
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vectorA", means);
			REXP x = connection.eval("sd(vectorA)");
			
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
	
	//get the variance of a prticular data series
	public double getVariance(double[] series) throws REngineException, REXPMismatchException{
		
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vectorA", series);
			REXP x = connection.eval("var(vectorA)");
			
			double result = x.asDouble();

            connection.close();
            
            return result;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        }  
        
        connection.close();		
        		
		return 0.0;
	}
	
	//overloaded variance method
	public double getVariance(int[] series) throws REngineException, REXPMismatchException{
		
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vectorA", series);
			REXP x = connection.eval("var(vectorA)");
			
			double result = x.asDouble();

            connection.close();
            
            return result;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        }  
        
        connection.close();		
        		
		return 0.0;
	}

	//performs a cross correlation between two series
	//index represents the lag interval that willbe returned
	public double crossCorrelation(int[] seriesA, int[] seriesB, int index) {

		RConnection connection = null;
		
        try {

            connection = new RConnection();

            connection.assign("vectorA", seriesA);
            connection.assign("vectorB", seriesB);
			REXP x = connection.eval("ccf(vectorA, vectorB, lag.max = 9, plot = FALSE)$acf"); //change lag back to 2
			
			double[] result = x.asDoubles();

            connection.close();
            
            if (Double.isNaN(result[index])){
            	return 0;
            } 
            
            return result[index]; //0 = -9, 1=-8 etc
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        } catch (REngineException e) {
			// TODO Auto-generated catch block
            connection.close();		

			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
	        connection.close();		

			e.printStackTrace();
		}  
        
        connection.close();		
        		
		return 0.0;
	}

	//calculate the cumulative variance for a data series (growth rate)
	public double[] getSeriesCulmVar(double[] parsedGrowth) {
		
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();
            
            int base = 0;
            int counter = 0;
            double [] culm = new double[parsedGrowth.length-1];
            double[] parsedArray;
            
            for (int i = 1; i < parsedGrowth.length; i++) {
            	
            	parsedArray = Arrays.copyOfRange(parsedGrowth, base, i+1);
                connection.assign("vectorA", parsedArray);
                
                REXP x = connection.eval("var(vectorA)");
				culm[counter] = x.asDouble();

				counter++;
			}			
            
            connection.close();
            
            return culm;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        } catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        
        connection.close();		
        		
		return null;
	}

	//performs a cross correltion getting only the -2 lag interval case
	public double crossCorrelation(double[] seriesA, double[] seriesB) {

		RConnection connection = null;
		
        try {

            connection = new RConnection();

            connection.assign("vectorA", seriesA);
            connection.assign("vectorB", seriesB);
			REXP x = connection.eval("ccf(vectorA, vectorB, lag.max = 2, plot = FALSE)$acf");
			
			double[] result = x.asDoubles();

            connection.close();
            
            return result[0]; //returns the negative 2 lag case
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        } catch (REngineException e) {
			// TODO Auto-generated catch block
            connection.close();		

			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
	        connection.close();		

			e.printStackTrace();
		}  
        
        connection.close();	
		return 0.0;
	}

	public String[] AD(int[] dataSubset) throws REngineException, REXPMismatchException {
		RConnection connection = null;
        String[] aDResults = new String[2];

        if(dataSubset.length > 52)
        	dataSubset = Arrays.copyOfRange(dataSubset, 26, dataSubset.length);

        try {

            connection = new RConnection();

            connection.assign("vectorA", dataSubset);
            connection.eval("library(\"nortest\")");
			REXP ADP = connection.eval("ad.test(vectorA)$p.value");
			REXP AD = connection.eval("ad.test(vectorA)$statistic");
			
			aDResults[0] = Double.toString(AD.asDouble());
			aDResults[1] = Double.toString(ADP.asDouble());

            connection.close();
            
            return aDResults;
            
        } catch (RserveException e) {
            connection.close();
            e.printStackTrace();
        }  
        
        connection.close();		
        
		return null;
	}

}
