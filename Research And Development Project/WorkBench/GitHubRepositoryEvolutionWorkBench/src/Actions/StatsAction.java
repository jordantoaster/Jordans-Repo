package Actions;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import Daos.StatDao;
import Models.Correlation;
import Models.GrowthRateModel;
import Models.Mean;
import Models.Normality;
import StatisticsR.RConnectionDarwin;

public class StatsAction implements Action{
	
	RConnectionDarwin r = new RConnectionDarwin();

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {

		String subAction = request.getParameter("subAction");
		String[] projects = request.getParameterValues("projectNames[]");
		String[] data = request.getParameterValues("data[]");
				
		if(subAction.equals("mean")){
			
			String result = processMean(data, projects, request.getParameter("typeOne"));
			
			return result;
		}
		if(subAction.equals("correlation")){
			
			String result = processCorrelation(data, request.getParameterValues("dataTwo[]"), projects, request.getParameter("seriesA"), request.getParameter("seriesB"));
			
			return result;
		}
		
		if(subAction.equals("growth")){
			
			String result = processGrowth(data, projects, request.getParameter("typeOne"));
			
			return result;		
		}
		
		if(subAction.equals("normality")){
			
			String result = processNormality(data, projects, request.getParameter("typeOne"));
			
			return result;		
		}
		
		return "no stat found";
	}

	private String processNormality(String[] data, String[] projects, String type) {
		String normalityType = type;		
		String normality[] = new String[4];
		int normalityCounter = 0;
		int[] dataSubset = null;
		int startPosition = 0;
		
		//loop all sets in array to get each seperate mean	
		for(int i =0; i<data.length;i++){
			
			//when we encounter a * split it from main array for use later
			if(data[i].equals("*")){
				
				//get section of array up to the terminator
				dataSubset = parseData(data, startPosition,i);
				startPosition = i + 1;
			
				//get mean
				try {
					normality = r.wilks(dataSubset);
					normalityCounter++;
				} catch (REngineException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (REXPMismatchException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
					
		//store then return
		Normality normalityModel = new Normality(projects[0], normality, normalityType);
		
		StatDao dao = new StatDao();
		dao.insertNormality(normalityModel);
		
		//String t = String.format("{ \"wilks\": \"%s\"}, \"wilksP\": \"%s\"}", normality[0], normality[1]);
		String t = String.format("{ \"wilks\": \"%s\", \"wilksP\": \"%s\"}", normality[0], normality[1]);
		return t;
	}

	private String processGrowth(String[] data, String[] projects, String type) {
		
		String growthType = type;		
		double[]growth = new double[projects.length];
		int[] dataSubset = null;
		int startPosition = 0;
		double absoluteGrowthRate  =0.0;
		
		//loop all sets in array to get each seperate mean	
		for(int i =0; i<data.length;i++){
			
			//when we encounter a * split it from main array for use later
			if(data[i].equals("*")){
				
				//get section of array up to the terminator
				dataSubset = parseData(data, startPosition,i);
				startPosition = i + 1;
			
				growth = getGrowthRate(dataSubset);
			}
		}
			
		double growthOverTime = growthRateOverTime(dataSubset[0], dataSubset[dataSubset.length-1], dataSubset.length);
		absoluteGrowthRate = singleGrowthRate(dataSubset[0], dataSubset[dataSubset.length-1]);
		
		//store then return
		GrowthRateModel growthRateModel = new GrowthRateModel(projects[0], growthType, growth, growthOverTime, absoluteGrowthRate);
		
		StatDao dao = new StatDao();
		dao.insertGrowthRate(growthRateModel);
		
		String t = String.format("{ \"absoluteGrowthRate\": \"%s\", \"growthRate\": \"%s\", \"growthRateOverTime"
				+ "\": \"%s\"}", absoluteGrowthRate, Arrays.toString(growth), growthOverTime);
		return t;
	}

	private String processCorrelation(String[] data, String[] d2, String[] projects, String t1, String t2) {
		
		String[] correlation = new String[4];
		String[] dataTwo = d2;
		String TypeOne =  t1;
		String TypeTwo =  t2;
		
		//convert to int arrays
		int[] SeriesA = parseArrayToInt(data);
		int[] SeriesB = parseArrayToInt(dataTwo);

		//get correlation
		try {
			correlation =  r.correlation(SeriesA, SeriesB);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//store
		StatDao dao = new StatDao();

		Correlation correlationModel = new Correlation(projects[0],projects[1],correlation[0], TypeOne, TypeTwo, correlation[1], correlation[2], correlation[3]);
		dao.insertCorrelation(correlationModel);
	
		String t = String.format("{ \"pearson\": \"%s\", \"spearman\": \"%s\", \"pearsonP\": \"%s\", \"spearmanP"
				+ "\": \"%s\"}", correlation[0], correlation[1], correlation[2], correlation[3]);
		return t;
	}

	private String processMean(String[] data, String[] projects, String type) {
		
		//holds the means
		String[] mean = new String[projects.length];
		String meanType = type;
		int[] dataSubset = null;
		int startPosition = 0;
		int meanCounter = 0;
					
		//loop all sets in array to get each seperate mean	
		for(int i =0; i<data.length;i++){
			
			//when we encounter a * split it from main array for use later
			if(data[i].equals("*")){
				
				//get section of array up to the terminator
				dataSubset = parseData(data, startPosition,i);
				startPosition = i + 1;
				
				//get mean
				try {
					mean[meanCounter] =  r.mean(dataSubset);
					meanCounter++;
				} catch (REngineException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (REXPMismatchException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		String combinedMean = "";
		
		//parse into a single string for transport
		for(int i=0;i<mean.length;i++){
			if(mean[i] != null){
				combinedMean = combinedMean + mean[i];
				combinedMean = combinedMean + "*";
			}
		}
		
		
		StatDao dao = new StatDao();

		//store mean
		for(int i =0; i < mean.length;i++){
			Mean meanModel = new Mean(projects[i],Integer.parseInt(mean[i]), meanType);
			dao.insertMean(meanModel);
		}
		
		//get mean of means
		StatDao statDao = new StatDao();
		int[] means = statDao.getAllMean(meanType);
		String collatedMean = "";
		
		//get mean
		try {
			collatedMean =  r.mean(means);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		//get standard deviation
		String standardDev = "";
		
		try {
			standardDev =  r.standardDev(means);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		//return mean to client
		//return combinedMean;
		String t = String.format("{ \"means\": \"%s\", \"collatedMean\": \"%s\", \"standardDev\": \"%s\"}", combinedMean, collatedMean, standardDev);
		return t;
		
	}

	private double singleGrowthRate(int pa, int pr) {
		double past = (double) pa;
		double present = (double) pr;
		
		double r1 = present - past;
		double r2 = r1 / past;
		double r3 = round(r2 * 100,2);
		return r3;

	}
	
	private double growthRateOverTime(int pa, int pr, int numSamples) {
		double past = (double) pa;
		double present = (double) pr;
		
		double r1 = present - past;
		double r2 = r1 / past;
		double r3 = r2 * 100;
		double r4 = round(r3 / numSamples,2);
		return  r4;
	}

	private double[] getGrowthRate(int[] parsedData) {

		double[] growthRate = new double[parsedData.length-1];
		int past =0;
		int present =1;
		
		for(int i=0;i<growthRate.length;i++){

			double r1 = parsedData[present]  - parsedData[past];
			double r2 = r1 / parsedData[past];
			growthRate[i] = round(r2 * 100,2);

			present ++;
			past ++;
		}
		
		return growthRate;
	}
	
	public static double round(double value, int places) {
	    if (places < 0) throw new IllegalArgumentException();

		try{
		    BigDecimal bd = new BigDecimal(value);
		    bd = bd.setScale(places, RoundingMode.HALF_UP);
		    return bd.doubleValue();
		}
		catch(NumberFormatException e){
			System.out.println("You divided by zero");
			return 0.0;
		}
	}

	private int[] parseData(String[] data, int startPosition, int terminatorPosition) {
		
		int range = terminatorPosition - startPosition;
		
		int[] parsedArray = new int[range];
		
		int parsedIndex = 0;
				
		for(int i =startPosition;i<terminatorPosition;i++){
			parsedArray[parsedIndex] = Integer.parseInt(data[i]);
			parsedIndex++;
		}
		
		return parsedArray;
	}
	
	private int[] parseArrayToInt(String[] data){
		int[] parsedArray = new int[data.length];

		for(int i =0;i<data.length;i++){
			parsedArray[i] = Integer.parseInt(data[i]);
		}
		return parsedArray;
	}
}
