/**
 * @author Jordan McDonald
 *
 * Description - Handles the processing for each law section - parses data for transmission/use in R - obtains the statistics for each law
 * & performs routing based on the law selected - all 'law actions' are handled here
 */

package Actions;

import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;

import com.mongodb.BasicDBList;

import Daos.CommitsDao;
import Daos.ContributionDao;
import Daos.IssueDao;
import Daos.LawsDao;
import Daos.StarDao;
import Daos.StatDao;
import Models.Commits;
import Models.Contributions;
import Models.GrowthRateModel;
import Models.Issues;
import Models.Stars;
import StatisticsR.RConnectionDarwin;

public class LawsAction implements Action {

	LawsDao dao = new LawsDao();
	StatDao sDao = new StatDao();
	CommitsDao cDao = new CommitsDao();
	StarDao starDao = new StarDao();
	IssueDao iDao = new IssueDao();
	ContributionDao conDao = new ContributionDao();
	RConnectionDarwin r = new RConnectionDarwin();

	//performs law action routing and returns the json string
	public String execute(HttpServletRequest request, HttpServletResponse response) {

		String json = "";

		if (request.getParameter("subAction").equals("one")) {
			json = getHpDataOne("commits", "stars");
		} else if (request.getParameter("subAction").equals("two")) {
			json = getHpDataTwo();
		} else if (request.getParameter("subAction").equals("three")) {
			json = getHpDataThree();
		} else if (request.getParameter("subAction").equals("four")) {
			json = getHpDataFour();
		} else if (request.getParameter("subAction").equals("five")) {
			json = getHpDataFive();
		} else if (request.getParameter("subAction").equals("six")) {
			json = getHpDataSix();
		} else if (request.getParameter("subAction").equals("seven")) {
			json = getHpDataSeven();
		}

		return json;
	}

	//perform cross correlation at different lag intervals on two data series - generate percentage within a threshold
	private String getHpDataSeven() {
		
		// SET VARIABLES
		double threshold = 0;
		double[] crossCorr = new double[10];
		int[] allInThreshold = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		String[] percentages = new String[10];

		// GET THE DATA SERIES
		ArrayList<Issues> seriesA = iDao.getIssues("GithubEvolution");
		ArrayList<Issues> seriesB = iDao.getIssuesComments("GithubEvolution");
		
		//temp variables to work out the mean cross corr at each lag
		double[] total = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		double[] means = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		 
		// PERFORM PROCESSING
		for (int i = 0; i < seriesA.size(); i++) {

			// get each contribution
			Issues attributeA = seriesA.get(i);

			// find associated issues
			for (int j = 0; j < seriesB.size(); j++) {
				Issues attributeB = seriesB.get(j);

				if (attributeA.getProject().equals(attributeB.getProject())) {

					// parse to int arrays
					int[] parsedSeriesA = parseArrayToInt(attributeA.getAllIssues());
					int[] parsedSeriesB = parseArrayToInt(attributeB.getComments());

					// get size diff
					int diffSize = parsedSeriesA.length - parsedSeriesB.length;

					// trim issues array
					if (diffSize >= 0) {
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, diffSize, parsedSeriesA.length);
					} else {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, Math.abs(diffSize), parsedSeriesB.length);

					}

					// trim both arrays both six months
					if (parsedSeriesB.length > 52) {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, 26, parsedSeriesB.length);
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, 26, parsedSeriesA.length);
					}

					for (int k = 0; k < 10; k++) {
						crossCorr[k] = r.crossCorrelation(parsedSeriesB, parsedSeriesA, k);
						
						total[k] = total[k] + crossCorr[k];

						if(k == 9){
							sDao.insertCrossCorr(crossCorr[k], "", "", "", "GithubEvolution");
						}

						if (crossCorr[k] < threshold) {
							allInThreshold[k]++;
						}
					}
				}
			}
		}
		
		//print mean values
		for (int i = 0; i < total.length; i++) {
			System.out.println(total[i] / 100);
		}

		for (int k = 0; k < 10; k++) {
			percentages[k] = Double.toString(((allInThreshold[k] * 100.0) / seriesA.size()));
		}
		
		String json = String.format("{ \"crossPercent\": \"%s\"}", Arrays.toString(percentages));

		return json;
	}

	//performs cross correlation between two data series at varying lag points - generate percentage of amount in a threshold
	private String getHpDataSix() {
		
		// SET VARIABLES
		double threshold = 0;
		double[] crossCorr = new double[10];
		int[] allInThreshold = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		String[] percentages = new String[10];

		// GET THE DATA SERIES
		ArrayList<Issues> seriesA = iDao.getIssues("GithubEvolution");
		ArrayList<Contributions> seriesB = conDao.getContributions("GithubEvolution");
		
		//temp variables to work out the mean cross corr at each lag
		double[] total = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		double[] means = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		 
		// PERFORM PROCESSING
		for (int i = 0; i < seriesA.size(); i++) {

			// get each contribution
			Issues attributeA = seriesA.get(i);

			// find associated issues
			for (int j = 0; j < seriesB.size(); j++) {
				Contributions attributeB = seriesB.get(j);
				
				if (attributeA.getProject().equals(attributeB.getProject())) {
					
					// parse to int arrays
					int[] parsedSeriesA = parseArrayToInt(attributeA.getAllIssues());
					int[] parsedSeriesB = parseArrayToInt(attributeB.getLOC());

					// get size diff
					int diffSize = parsedSeriesA.length - parsedSeriesB.length;

					// trim issues array
					if (diffSize >= 0) {
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, diffSize, parsedSeriesA.length);
					} else {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, Math.abs(diffSize), parsedSeriesB.length);

					}

					// trim both arrays both six months
					if (parsedSeriesB.length > 52) {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, 26, parsedSeriesB.length);
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, 26, parsedSeriesA.length);
					}

					for (int k = 0; k < 10; k++) {
						crossCorr[k] = r.crossCorrelation(parsedSeriesB, parsedSeriesA, k);
						
						total[k] = total[k] + crossCorr[k];

						if(k == 9){
							//sDao.insertCrossCorr(crossCorr[k], "", "", "");
						}

						if (crossCorr[k] < threshold) {
							allInThreshold[k]++;
						}
					}
				}
			}
		}
		
		//print mean values
		for (int i = 0; i < total.length; i++) {
			System.out.println(total[i] / 100);
		}

		for (int k = 0; k < 10; k++) {
			percentages[k] = Double.toString(((allInThreshold[k] * 100.0) / seriesA.size()));
		}
		
		//sDao.getCross();

		String json = String.format("{ \"crossPercent\": \"%s\"}", Arrays.toString(percentages));

		return json;
	}

	//performs a cross correlation at different lag points between two data series - generate percentage of amount within a threshold
	private String getHpDataFive() {
		
		// SET VARIABLES
		double threshold = 0;
		double[] crossCorr = new double[10];
		int[] allInThreshold = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		String[] percentages = new String[10];

		// GET THE DATA SERIES
		ArrayList<Issues> seriesA = iDao.getIssues("GithubEvolution");
		ArrayList<GrowthRateModel> seriesB = sDao.getGrowthRate("GithubEvolution");
		
		//temp variables to work out the mean cross corr at each lag
		double[] total = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		double[] means = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

		// PERFORM PROCESSING
		for (int i = 0; i < seriesA.size(); i++) {

			// get each contribution
			Issues attributeA = seriesA.get(i);

			// find associated issues
			for (int j = 0; j < seriesB.size(); j++) {
				GrowthRateModel attributeB = seriesB.get(j);

				if (attributeA.getProject().equals(attributeB.getProjectName())) {

					// parse to int arrays
					int[] parsedSeriesA = parseArrayToInt(attributeA.getAllIssues());
					int[] parsedSeriesB = parseArrayToInt(attributeB.getGrowth());

					// get size diff
					int diffSize = parsedSeriesB.length - parsedSeriesA.length;

					// trim issues array
					if (diffSize >= 0) {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, diffSize, parsedSeriesB.length);
					} else {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, Math.abs(diffSize), parsedSeriesB.length);

					}

					// trim both arrays both six months
					if (parsedSeriesB.length > 52) {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, 26, parsedSeriesB.length);
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, 26, parsedSeriesA.length);
					}

					for (int k = 0; k < 10; k++) {
						crossCorr[k] = r.crossCorrelation(parsedSeriesB, parsedSeriesA, k);
						
						total[k] = total[k] + crossCorr[k];

						if(k == 9){
							//sDao.insertCrossCorr(crossCorr[k], "", "", "");
						}

						if (crossCorr[k] > threshold) {
							allInThreshold[k]++;
						}
					}
				}
			}
		}
				
		//print mean values
		for (int i = 0; i < total.length; i++) {
			System.out.println(total[i] / 100);
		}

		for (int k = 0; k < 10; k++) {
			percentages[k] = Double.toString(((allInThreshold[k] * 100.0) / seriesA.size()));
		}

		String json = String.format("{ \"crossPercent\": \"%s\"}", Arrays.toString(percentages));

		return json;
	}

	//Performs a series of cross correlations between two data series and determines the amount within a threshold
	private String getHpDataOne(String typeOne, String typeTwo) {

		// SET VARIABLES
		double threshold = 0;
		double[] crossCorr = new double[10];
		int[] allInThreshold = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		String[] percentages = new String[10];
		
		//temp variables to work out the mean cross corr at each lag
		double[] total = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		double[] means = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

		// GET THE DATA SERIES
		ArrayList<Commits> seriesA = cDao.getCommits("GithubEvolution");
		ArrayList<Stars> seriesB = starDao.getStars("GithubEvolution");

		// PERFORM PROCESSING
		for (int i = 0; i < seriesA.size(); i++) {

			// get each contribution
			Commits attributeA = seriesA.get(i);

			// find associated issues
			for (int j = 0; j < seriesB.size(); j++) {
				Stars attributeB = seriesB.get(j);

				if (attributeA.getProject().equals(attributeB.getProject())) {

					// parse to int arrays
					int[] parsedSeriesA = parseArrayToInt(attributeA.getCommits());
					int[] parsedSeriesB = parseArrayToInt(attributeB.getStars());

					// get size diff
					int diffSize = parsedSeriesA.length - parsedSeriesB.length;

					// trim issues array
					if (diffSize >= 0) {
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, diffSize, parsedSeriesA.length);
					} else {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, Math.abs(diffSize), parsedSeriesB.length);

					}

					// trim both arrays both six months
					if (parsedSeriesB.length > 52) {
						parsedSeriesB = Arrays.copyOfRange(parsedSeriesB, 26, parsedSeriesB.length);
						parsedSeriesA = Arrays.copyOfRange(parsedSeriesA, 26, parsedSeriesA.length);
					}

					for (int k = 0; k < 10; k++) {
						crossCorr[k] = r.crossCorrelation(parsedSeriesA, parsedSeriesB, k);
						
						total[k] = total[k] + crossCorr[k];

						if (crossCorr[k] > threshold) {
							allInThreshold[k]++;
						}
					}
										
				}
			}
		}
		
		//print mean values - testing
		for (int i = 0; i < total.length; i++) {
			//System.out.println(total[i] / 100);
		}

		//generate percenatge values for all within the threshold compared to a total
		for (int k = 0; k < 10; k++) {
			percentages[k] = Double.toString(((allInThreshold[k] * 100.0) / seriesA.size()));
		}

		String json = String.format("{ \"crossPercent\": \"%s\"}", Arrays.toString(percentages));

		return json;
	}

	//processings HP4 - gets growth rate data from DB and calculates the variance and standard deviation
	private String getHpDataFour() {
		
			int numInCollection = sDao.getNumInCollection("GrowthRate", "GithubEvolution");
			double[] variance = new double[numInCollection]; 
			double[] standDev = new double[numInCollection]; 
			int[] numInSD = new int[numInCollection]; 
			double mean =0;
			int[] seriesSizes = new int[numInCollection];
				  
			//get each growth loc series and get the variance 
			for (int i =0; i < numInCollection; i++) {
				  
			double[] series = sDao.getGrowthRateIndex(i, "GithubEvolution");
			seriesSizes[i] = series.length;
				  
			try { 
				 variance[i] = r.getVariance(series); 
				 standDev[i] =Math.sqrt(variance[i]); 
				 mean = r.mean(series); 
				 numInSD[i] = sDao.getNumInSD(series, standDev[i], mean); 				  
				  } catch (REngineException e) {
					  e.printStackTrace(); 
				  } catch (REXPMismatchException e) { 
					  e.printStackTrace(); 
				  } 		 
				}
				 
				//parse data into a form that can be sent over JSON
				String[] parseVariance = new String[numInCollection];
				String[] parseInSd = new String[numInCollection];
				
				for (int i = 0; i < numInSD.length; i++) {
					float in = (float)((numInSD[i]*100.0)/seriesSizes[i]);
					parseInSd[i] = String.valueOf(in);
				}
				
				for (int i = 0; i < variance.length; i++) {
					float in = (float)((variance[i]*100.0)/seriesSizes[i]);
					parseVariance[i] = String.valueOf(in);
				}
				  
				 String json = String.format("{ \"vari\": \"%s\", \"sd\": \"%s\"}", Arrays.toString(parseVariance), Arrays.toString(parseInSd));
				 
				 return json;	
			}

	//law three processing - get issues, additions, deletions from DB - clauclate shapiro wilks using R - count percentage within the 0.05 p value threshold
	private String getHpDataThree() {
		
		  		  ContributionDao daoC = new ContributionDao(); 
		  		  IssueDao daoI = new IssueDao();
				  
				  //get a class (model) of contribution stuff required name etc
				  ArrayList<Contributions> contributions = daoC.getContributions("GithubEvolution");
				  
				  //get issue class 
				  ArrayList<Issues> issues = daoI.getIssues("GithubEvolution");
				  
				  String[] issueWilks= null; 
				  String[] additionsWilks=null; 
				  String[]
				  deletionsWilks=null;
				  
				  int issuesInThreshold = 0; int additionsInThreshold = 0; int deletionsInThreshold = 0;
				  				 
				  int total =0;
				  
				  //get shapiro wilks for every projects a,d and i - get p number
				  for (int i = 0; i < contributions.size(); i++) {
				  
				  //get each contribution 
				  Contributions contribution =contributions.get(i);
				  
				  //find associated issues 
				  for (int j = 0; j < issues.size(); j++) 
				  { 
				  Issues issue = issues.get(j);
				  
				  String [] is = issue.getAllIssues();
				  
				  if(issue.getProject().equals(contribution.getProject())){
				  
				  total++;
				  
				  //shapiro wilks
				  try { 
				  issueWilks =r.wilks(parseArrayToInt(issue.getAllIssues())); 
				  additionsWilks =r.wilks(parseArrayToInt(contribution.getAdditions())); 
				  deletionsWilks = r.wilks(parseArrayToInt(contribution.getDeletions()));
				  } 
				  catch (REngineException e) {
					  e.printStackTrace(); 
				  } 
				  catch (REXPMismatchException e) 
				  { 
					  e.printStackTrace(); 
				  }
				  
				  //is p less then 0.05? - if so increment
				  if(Double.parseDouble(issueWilks[1]) <= 0.01){ 
					  issuesInThreshold++; 
					  }
				  if(Double.parseDouble(additionsWilks[1]) <= 0.01){
					  additionsInThreshold++; 
				  } 
				  if(Double.parseDouble(deletionsWilks[1]) <= 0.01){ 
					  deletionsInThreshold++;
				  }
				  
				  break;
				  } 
			}

	}

	// find out how many for each category are in the threshold or 0.05
	float[] inThreshold = new float[3];
	inThreshold[0]=(float)((issuesInThreshold*100.0)/total);
	inThreshold[1]=(float)((additionsInThreshold*100.0)/total);
	inThreshold[2]=(float)((deletionsInThreshold*100.0)/total);
	
	String json = String.format("{ \"additions\": \"%s\", \"deletions\": \"%s\", \"issues\": \"%s\"}", inThreshold[1], inThreshold[2],inThreshold[0]);
	 
	return json;

	}

	//performs law HP2 processing - gets growth rate data from DB - calculate percentage of growth which are positive
	private String getHpDataTwo() {
		 //get the average interval value for each project ArrayList<Double>
		 ArrayList<Double> averages = dao.getGrowthRateAverages("GithubEvolution");
		 
		 int total = averages.size(); int numPositiveGrowth = 0;
		 
		 for (int i = 0; i < averages.size(); i++) { 
			 if(averages.get(i) > 0){
				 numPositiveGrowth++;
			}
		}
		
		 int notPositive = total - numPositiveGrowth;
		  
		 //convert to percentage 
		 float percentage = (float) ((numPositiveGrowth *100.0) / total);
		 float notIn = (float) ((notPositive *100.0) / total);
		  
		 String json = String.format("{ \"numPos\": \"%s\", \"numNeg\": \"%s\"}", percentage, notIn);
		 
		 return json;
	}

	//changes a string array to a int array
	private int[] parseArrayToInt(String[] data) {
		int[] parsedArray = new int[data.length];

		for (int i = 0; i < data.length; i++) {
			parsedArray[i] = Integer.parseInt(data[i]);
		}
		return parsedArray;
	}

	//changes a string array to a double array
	private double[] parseArrayToDouble(String[] data) {
		double[] parsedArray = new double[data.length];

		for (int i = 0; i < data.length; i++) {
			parsedArray[i] = Double.parseDouble(data[i]);
		}
		return parsedArray;
	}

	//transfers a double array to an int array
	private int[] parseArrayToInt(double[] data) {
		int[] parsedArray = new int[data.length];

		for (int i = 0; i < data.length; i++) {
			parsedArray[i] = (int) data[i];
		}
		return parsedArray;
	}

}
