/**
 * @author Jordan McDonald
 *
 * Description - Handles all the processing for the statistical application functionality by determining what stat is required 
 * and feeding the data into the relevant function - all 'stat actions' are handled here
 */

package Actions;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
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

public class StatsAction implements Action {

	RConnectionDarwin r = new RConnectionDarwin();
	private String combinedMedian;

	public String execute(HttpServletRequest request, HttpServletResponse response) {

		//gets the data from the HTTP request
		String subAction = request.getParameter("subAction");
		String[] projects = request.getParameterValues("projectNames[]");
		String[] data = request.getParameterValues("data[]");

		//depending on the input action redirect the program flow to differing functionality
		if (subAction.equals("mean")) {

			String result = processDispersion(data, projects, request.getParameter("typeOne"));

			return result;
		}
		if (subAction.equals("variance")) {

			String result = processVariance(data, projects, request.getParameter("typeOne"));

			return result;
		}
		if (subAction.equals("correlation")) {

			String result = processCorrelation(data, request.getParameterValues("dataTwo[]"), projects,
					request.getParameter("seriesA"), request.getParameter("seriesB"));

			return result;
		}

		if (subAction.equals("growth")) {

			String result = processGrowth(data, projects, request.getParameter("typeOne"));

			return result;
		}

		if (subAction.equals("normality")) {

			String result = processNormality(data, projects, request.getParameter("typeOne"));

			return result;
		}

		//handles the case where a bad request was made
		return "no stat found";
	}

	//using the input data series the variance is obtained and store in the database
	private String processVariance(String[] data, String[] projects, String type) {

		double variance = 0;
		int[] dataSubset = null;
		int startPosition = 0;
		ArrayList<Double> allVariance= new ArrayList<Double>();

		// loop all sets in array to get each seperate data series - each seperated by a '*'
		for (int i = 0; i < data.length; i++) {

			// when we encounter a * split it from main array for use later
			if (data[i].equals("*")) {

				// get section of array up to the terminator
				dataSubset = parseData(data, startPosition, i);
				startPosition = i + 1;
				
				//get the variance using the R environment
				try {
					variance = r.getVariance(dataSubset);

					// add to overall list
					allVariance.add(variance);

				} catch (REngineException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (REXPMismatchException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		StatDao dao = new StatDao();
		double[] varianceParsed = new double[allVariance.size()];
		
		//insert into the Database and convert to a form that can be sent using JSON over HTTP
		for (int i = 0; i < allVariance.size(); i++) {
			dao.insertVariance(allVariance.get(i), type, "GithubEvolution");
			varianceParsed[i] = allVariance.get(i);
		}
		
		//convert data to a form which can be sent over HTTP
		ArrayList<String> allVarianceType = dao.getVarianceType(type, "GithubEvolution");	
		String[] AllVarianceParsed = new String[allVarianceType.size()];
		AllVarianceParsed = allVarianceType.toArray(AllVarianceParsed);

		//return JSON String
		String json = String.format("{ \"variance\": \"%s\",\"allVar\": \"%s\"}", Arrays.toString(varianceParsed), Arrays.toString(AllVarianceParsed));
		return json;
	}

	//Aplies the shapiro wilks test of normality on the provided data series - utilises the R environment
	private String processNormality(String[] data, String[] projects, String type) {
		
		String normalityType = type;
		String normality[] = new String[2];
		int[] dataSubset = null;
		int startPosition = 0;
		int normalityCounter = 0;
		ArrayList<String> allNormality = new ArrayList<String>();
		StatDao dao = new StatDao();

		// loop all sets in array to get each seperate mean
		for (int i = 0; i < data.length; i++) {

			// when we encounter a * split it from main array for use later
			if (data[i].equals("*")) {

				// get section of array up to the terminator
				dataSubset = parseData(data, startPosition, i);
				startPosition = i + 1;

				// get mean
				try {
					normality = r.wilks(dataSubset);

					// model and store
					Normality normalityModel = new Normality(projects[0], normality, normalityType);
					dao.insertNormality(normalityModel, "GithubEvolution");

					// add to overall list
					allNormality.add(projects[normalityCounter]);
					allNormality.add(normality[0]);
					allNormality.add(normality[1]);

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
		
		//The data is transferedd to a form which can be sent over HTTP using json
		ArrayList<String> allNormalityType = dao.getWilksType(type, "GithubEvolution");
		String[] AllNormalityParsed = new String[allNormalityType.size()];
		AllNormalityParsed = allNormalityType.toArray(AllNormalityParsed);

		String[] normalityParsed = new String[allNormality.size()];
		normalityParsed = allNormality.toArray(normalityParsed);

		String json = String.format("{ \"wilks\": \"%s\",\"all\": \"%s\"}", Arrays.toString(normalityParsed), Arrays.toString(AllNormalityParsed));
		return json;
	}

	//function splits each series in the string and determines the growth rate metrics for each project
	private String processGrowth(String[] data, String[] projects, String type) {

		String growthType = type;
		ArrayList<String> growthAll = new ArrayList<String>();
		double[] growth = new double[projects.length];
		int[] dataSubset = null;
		int startPosition = 0;
		double absoluteGrowthRate = 0.0;
		double growthOverTime = 0;
		int counter = 0;

		// loop all sets in array to get each seperate mean
		for (int i = 0; i < data.length; i++) {

			// when we encounter a * split it from main array for use later
			if (data[i].equals("*")) {

				// get section of array up to the terminator
				dataSubset = parseData(data, startPosition, i);
				startPosition = i + 1;

				dataSubset = Arrays.copyOfRange(dataSubset, 26, dataSubset.length);

				// get required data for each subset & store
				growth = getGrowthRate(dataSubset);

				//gets the growth rate data
				growthOverTime = growthRateOverTime(dataSubset[0], dataSubset[dataSubset.length - 1],
						dataSubset.length);
				absoluteGrowthRate = singleGrowthRate(dataSubset[0], dataSubset[dataSubset.length - 1]);

				// store then return
				GrowthRateModel growthRateModel = new GrowthRateModel(projects[counter], growthType, growth,
						growthOverTime, absoluteGrowthRate);

				//stores the growth data
				StatDao dao = new StatDao();
				
				dao.insertGrowthRate(growthRateModel, "GithubEvolution");
				
				for (int j = 0; j < growth.length; j++) {
					growthAll.add(Double.toString(growth[j]));
				}
				growthAll.add("*");

				counter++;
			}
		}
		
		growthAll.remove(growthAll.size()-1);
		String[] parsedGrowth = new String[growthAll.size()];
		
		//parse growth data to allow tranmission over HTTP
		for (int i = 0; i < growthAll.size(); i++) {
			parsedGrowth[i] = growthAll.get(i);
		}

		//format and return a json string containing the data
		String json = String.format(
				"{ \"absoluteGrowthRate\": \"%s\", \"growthRate\": \"%s\", \"growthRateOverTime" + "\": \"%s\"}",
				absoluteGrowthRate, Arrays.toString(parsedGrowth), growthOverTime);
		return json;
	}

	//function takes two string series and obtains various correlation metrics
	private String processCorrelation(String[] data, String[] d2, String[] projects, String t1, String t2) {

		String[] correlation = new String[4];
		String[] dataTwo = d2;
		String TypeOne = t1;
		String TypeTwo = t2;
		double crossCorr = 0;

		// convert to int arrays (to work with R environment)
		int[] SeriesA = parseArrayToInt(data);
		int[] SeriesB = parseArrayToInt(dataTwo);

		// get correlation using R - pearsons, spearman and cross correlation with -2 lag
		try {
			correlation = r.correlation(SeriesA, SeriesB);
			crossCorr = r.crossCorrelation(SeriesA, SeriesB,7);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// store
		StatDao dao = new StatDao();

		//generate a bean containing the data and insert into DB
		Correlation correlationModel = new Correlation(projects[0], projects[1], correlation[0], TypeOne, TypeTwo,
				correlation[1], correlation[2], correlation[3]);
		dao.insertCorrelation(correlationModel, "GithubEvolution");
		
		//get all the other correlations values that use the same metric types
		ArrayList<String> correlations = dao.getAllCorrelations(t1,t2, "GithubEvolution");
		
		//parse data for sending over HTTP
		String[] correlationsParsed = new String[correlations.size()];
		correlationsParsed = correlations.toArray(correlationsParsed);

		//forma the json string and return for tranmission to the UI
		String json = String.format(
				"{ \"pearson\": \"%s\", \"spearman\": \"%s\", \"pearsonP\": \"%s\", \"spearmanP"
						+ "\": \"%s\", \"cross\": \"%s\", \"allCorr\": \"%s\"}",
				correlation[0], correlation[1], correlation[2], correlation[3], crossCorr, Arrays.toString(correlationsParsed));
		return json;
	}

	//using the data provided the dispersion statistics are retrieved and returned to the UI
	private String processDispersion(String[] data, String[] projects, String type) {

		// holds the data
		String[] mean = new String[projects.length];
		String meanType = type;
		int[] dataSubset = null;
		int startPosition = 0;
		int meanCounter = 0;
		int collatedMedian = 0;
		int[] medians = new int[projects.length];

		// loop all sets in array to get each seperate series
		for (int i = 0; i < data.length; i++) {

			// when we encounter a * split it from main array for use later
			if (data[i].equals("*")) {

				// get section of array up to the terminator
				dataSubset = parseData(data, startPosition, i);
				startPosition = i + 1;

				// get statistics using R
				try {
					mean[meanCounter] = r.mean(dataSubset);
					medians[meanCounter] = r.median(dataSubset);
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

		// parse into a single string for transport
		for (int i = 0; i < mean.length; i++) {
			if (mean[i] != null) {
				combinedMean = combinedMean + mean[i];
				combinedMean = combinedMean + "*";
			}
		}
		for (int i = 0; i < medians.length; i++) {
			combinedMedian = combinedMean + mean[i].toString();
			combinedMedian = combinedMean + "*";
		}

		StatDao dao = new StatDao();

		// store data
		for (int i = 0; i < mean.length; i++) {
			Mean meanModel = new Mean(projects[i], Integer.parseInt(mean[i]), meanType);
			dao.insertMean(meanModel, "GithubEvolution");
		}

		// get mean of means
		StatDao statDao = new StatDao();
		int[] means = statDao.getAllMean(meanType, "GithubEvolution");
		String collatedMean = "";

		// get mean and median of the means
		try {
			collatedMean = r.mean(means);
			collatedMedian = r.median(means);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// get standard deviation
		String standardDev = "";
		try {
			standardDev = r.standardDev(means);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// return data to client in json format
		String json = String.format("{ \"means\": \"%s\", \"collatedMean\": \"%s\", \"standardDev\": \"%s\", \"collatedMedian\": \"%s\", \"medians\": \"%s\"}",
				combinedMean, collatedMean, standardDev, collatedMedian, combinedMedian);
		return json;

	}

	//gets the growth rate between two time series intervals
	private double singleGrowthRate(int pa, int pr) {
		double past = (double) pa;
		double present = (double) pr;

		double r1 = present - past;
		double r2 = r1 / past;
		double r3 = round(r2 * 100, 2);
		return r3;
	}

	// gets an average based on max and min value
	private double growthRateOverTime(int pa, int pr, int numSamples) {
		double past = (double) pa;
		double present = (double) pr;

		double r1 = present - past;
		double r2 = r1 / past;
		double r3 = r2 * 100;
		double r4 = round(r3 / numSamples, 2);
		return r4;
	}

	//returns an array containing growth rates between each interval in the original series of data
	private double[] getGrowthRate(int[] parsedData) {

		double[] growthRate = new double[parsedData.length - 1];
		int past = 0;
		int present = 1;

		for (int i = 0; i < growthRate.length; i++) {

			double r1 = parsedData[present] - parsedData[past];
			double r2 = r1 / parsedData[past];
			growthRate[i] = round(r2 * 100, 2);

			present++;
			past++;
		}

		return growthRate;
	}

	//utility function to round exponentials correctly
	public static double round(double value, int places) {
		if (places < 0)
			throw new IllegalArgumentException();

		try {
			BigDecimal bd = new BigDecimal(value);
			bd = bd.setScale(places, RoundingMode.HALF_UP);
			return bd.doubleValue();
		} catch (NumberFormatException e) {
			System.out.println("You divided by zero");
			return 0.0;
		}
	}

	//translates a string array into an integer array based on a subsequence
	private int[] parseData(String[] data, int startPosition, int terminatorPosition) {

		int range = terminatorPosition - startPosition;

		int[] parsedArray = new int[range];

		int parsedIndex = 0;

		for (int i = startPosition; i < terminatorPosition; i++) {
			parsedArray[parsedIndex] = Integer.parseInt(data[i]);
			parsedIndex++;
		}

		return parsedArray;
	}

	//translate an entire series into an int array
	private int[] parseArrayToInt(String[] data) {
		int[] parsedArray = new int[data.length];

		for (int i = 0; i < data.length; i++) {
			parsedArray[i] = Integer.parseInt(data[i]);
		}
		return parsedArray;
	}
}
