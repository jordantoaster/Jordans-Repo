package StatisticsR;


import java.util.ArrayList;
import java.util.Arrays;

import org.rosuda.REngine.REXP;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import org.rosuda.REngine.RList;
import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;

import com.mongodb.BasicDBList;

public class RConnectionDarwin {
	
	public String mean(int[] dataSubset) throws REngineException, REXPMismatchException {
				
		RConnection connection = null;
		
        try {
            /* Create a connection to Rserve instance running
             * on default port 6311
             */
            connection = new RConnection();

            connection.assign("vector", dataSubset);
			REXP x = connection.eval("mean(vector)");
			System.out.println(x.asInteger());
			
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
        
		return 0;
    }
	
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
        String[] wilksResults = new String[2];

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

	public double crossCorrelation(int[] seriesA, int[] seriesB, int index) {

		RConnection connection = null;
		
        try {

            connection = new RConnection();

            connection.assign("vectorA", seriesA);
            connection.assign("vectorB", seriesB);
			REXP x = connection.eval("ccf(vectorA, vectorB, lag.max = 9, plot = FALSE)$acf"); //change lag back to 2
			
			double[] result = x.asDoubles();

            connection.close();
            
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

}
