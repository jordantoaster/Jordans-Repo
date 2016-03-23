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
	
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		
		//get law 1 and 6
		float hpOneResult = getHPOne("Commits", "Stars");
			
		//get Law 2
		float hpTwoResult = getHPTwo();

		
		//get Law 3
		float[] hpThreeResult = getHPThree();
		
		
		//get law 4
		double hpFourResult = getHPFour();

		sDao.getCross();

		
		//get HP5
		double hpFiveResult = getHPFive("Growth Rate", "Variance");
		
		
		//get HP6
		double hpSixResults = getHPSix("Issues", "LOC");
		
		
		//get HP7
		double hpSevenResults = getHPSeven("Issues", "IssuesComments");
		

		String t = String.format("{ \"hpTwo\": \"%s\", \"hpThreeI\": \"%s\", \"hpThreeA\": \"%s\", \"hpThreeD\": \"%s\", \"hpFour\": \"%s\","
				+ " \"hpOne\": \"%s\", \"hpSix\": \"%s\", \"hpSeven\": \"%s\", \"hpFive\": \"%s\"}", 
				hpTwoResult, hpThreeResult[0],hpThreeResult[1],hpThreeResult[2],hpFourResult, hpOneResult, hpSixResults, hpSevenResults,hpFiveResult);
		return t;
	}

	private double getHPFive(String typeOne, String typeTwo) {
		
		double threshold = 0;
		int corrInThreshold = 0;
		double crossCorr = 0;
		
		ArrayList<Issues> issues = iDao.getIssues();
		ArrayList<GrowthRateModel> growths = sDao.getGrowthRate();


		//perform cross
		for (int i = 0; i < issues.size(); i++) {
					
			//get each contribution
			Issues issue = issues.get(i);
					
			//find associated issues
			for (int j = 0; j < growths.size(); j++) {
				
				GrowthRateModel growth = growths.get(j);
				
				System.out.println(issue.getProject() + " - " + growth.getProjectName());
						
				if(issue.getProject().equals(growth.getProjectName())){
							
					//parse to int arrays
					double[] parsedIssue = parseArrayToDouble(issue.getAllIssues());
					double[] parsedGrowth = growth.getGrowth();
							
					//get size diff
					int diffSize =  parsedGrowth.length - parsedIssue.length;
							
					//trim growth array
					if(diffSize >= 0){
						parsedGrowth = Arrays.copyOfRange(parsedGrowth, diffSize, parsedGrowth.length);
					} else{
						parsedIssue = Arrays.copyOfRange(parsedIssue, Math.abs(diffSize), parsedIssue.length);
					}
							
					//trim both arrays both six months
					parsedGrowth = Arrays.copyOfRange(parsedGrowth, 26, parsedGrowth.length);
					parsedIssue = Arrays.copyOfRange(parsedIssue, 26, parsedIssue.length);
					
					//get cumulative variance of growth
					double[] culmVarGrowth = r.getSeriesCulmVar(parsedGrowth);
												
					//gets -2 corr value
					crossCorr = r.crossCorrelation(culmVarGrowth, parsedIssue);
							
					//store corr value for -2
					sDao.insertCrossCorr(crossCorr, issue.getProject(), typeOne, typeTwo);

					if(crossCorr > threshold){
						corrInThreshold++;
					}
				}
			}
		}
				
		float percentage = (float) ((corrInThreshold * 100.0) / issues.size());
				
		return percentage;			
	}


	private double getHPSeven(String typeOne, String typeTwo) {

		double threshold = 0;
		int corrInThreshold = 0;
		double crossCorr = 0;

		ArrayList<Issues> issues = iDao.getIssues();
		ArrayList<Issues> comments = iDao.getIssuesComments();
		
		//perform cross
		for (int i = 0; i < issues.size(); i++) {
					
			//get each contribution
			Issues issue = issues.get(i);
					
			//find associated issues
			for (int j = 0; j < comments.size(); j++) {
				Issues issueComments = comments.get(j);
						
				if(issue.getProject().equals(issueComments.getProject())){
							
					//parse to int arrays
					int[] parsedIssue = parseArrayToInt(issue.getAllIssues());
					int[] parsedComments = parseArrayToInt(issueComments.getComments());
							
					//get size diff
					int diffSize =  parsedIssue.length - parsedComments.length;
													
							
					//trim issues array
					if(diffSize >= 0){
						parsedIssue = Arrays.copyOfRange(parsedIssue, diffSize, parsedIssue.length);
					} else {
						parsedComments = Arrays.copyOfRange(parsedComments, Math.abs(diffSize), parsedComments.length);

					}
							
					//trim both arrays both six months
					if(parsedComments.length > 52){
						parsedComments = Arrays.copyOfRange(parsedComments, 26, parsedComments.length);
						parsedIssue = Arrays.copyOfRange(parsedIssue, 26, parsedIssue.length);
					}
												
					//gets -2 corr value
					crossCorr = r.crossCorrelation(parsedComments, parsedIssue);
							
					//store corr value for -2
					sDao.insertCrossCorr(crossCorr, issue.getProject(), typeOne, typeTwo);

					if(crossCorr < threshold){ //negative threshold
						corrInThreshold++;
					}
				}
			}
		}
				
		float percentage = (float) ((corrInThreshold * 100.0) / issues.size());
				
		return percentage;		
		
	}

	private double getHPSix(String typeOne, String typeTwo) {
		double threshold = 0;
		int corrInThreshold = 0;
		double crossCorr = 0;

		ArrayList<Issues> issues = iDao.getIssues();
		ArrayList<Contributions> contributions = conDao.getContributions();	
		
		//perform cross
		for (int i = 0; i < issues.size(); i++) {
			
			//get each contribution
			Issues issue = issues.get(i);
			
			//find associated issues
			for (int j = 0; j < contributions.size(); j++) {
				Contributions contribution = contributions.get(j);
				
				if(issue.getProject().equals(contribution.getProject())){
					
					//parse to int arrays
					int[] parsedIssue = parseArrayToInt(issue.getAllIssues());
					int[] parsedLOC = parseArrayToInt(contribution.getLOC());
					
					//get size diff
					int diffSize =  parsedLOC.length - parsedIssue.length;
				
					
					//trim commits array
					if(diffSize >= 0){
						parsedLOC = Arrays.copyOfRange(parsedLOC, diffSize, parsedLOC.length);
					} else {
						parsedIssue = Arrays.copyOfRange(parsedIssue, Math.abs(diffSize), parsedIssue.length);
					}
					
					//trim both arrays both six months
					parsedLOC = Arrays.copyOfRange(parsedLOC, 26, parsedLOC.length);
					parsedIssue = Arrays.copyOfRange(parsedIssue, 26, parsedIssue.length);
										
					//gets -2 corr value
					crossCorr = r.crossCorrelation(parsedIssue, parsedLOC);
					
					//store corr value for -2
					sDao.insertCrossCorr(crossCorr, contribution.getProject(), typeOne, typeTwo);

					if(crossCorr < threshold){ //negative correlation
						corrInThreshold++;
					}
				}
			}
		}
		
		float percentage = (float) ((corrInThreshold * 100.0) / contributions.size());
		
		return percentage;
	}

	private float getHPOne(String typeOne, String typeTwo) {

		//get the series & set the threshold
		double threshold = 0;
		int corrInThreshold = 0;
		double crossCorr = 0;

		ArrayList<Commits> commits = cDao.getCommits();
		ArrayList<Stars> stars = starDao.getStars();	
		
		//perform cross
		for (int i = 0; i < commits.size(); i++) {
			
			//get each contribution
			Commits commit = commits.get(i);
			
			//find associated issues
			for (int j = 0; j < stars.size(); j++) {
				Stars star = stars.get(j);
				
				if(star.getProject().equals(commit.getProject())){
					
					//parse to int arrays
					int[] parsedStars = parseArrayToInt(star.getStars());
					int[] parsedCommits = parseArrayToInt(commit.getCommits());
					
					//get size diff
					int diffSize =  parsedCommits.length - parsedStars.length;
					
					
					//test - last dates are not the same, so cant line up like this - NEED A FIX
					//String[] ds = star.getDates();
					//String[] dr = commit.getDates();
					//int testDiff = dr.length - ds.length;
					//dr = Arrays.copyOfRange(dr, testDiff, dr.length);
					
					//trim commits array
					if(diffSize >= 0){
						parsedCommits = Arrays.copyOfRange(parsedCommits, diffSize, parsedCommits.length);
					} else {
						parsedStars = Arrays.copyOfRange(parsedStars, Math.abs(diffSize), parsedStars.length);
					}
					
					//trim both arrays both six months
					parsedCommits = Arrays.copyOfRange(parsedCommits, 26, parsedCommits.length);
					parsedStars = Arrays.copyOfRange(parsedStars, 26, parsedStars.length);
										
					//gets -2 corr value
					crossCorr = r.crossCorrelation(parsedCommits, parsedStars);
					
					//store corr value for -2
					sDao.insertCrossCorr(crossCorr, commit.getProject(), typeOne, typeTwo);

					if(crossCorr > threshold){
						corrInThreshold++;
					}
				}
			}
		}
		
		float percentage = (float) ((corrInThreshold * 100.0) / commits.size());
		
		return percentage;
	}

	private double getHPFour() {
		
		int numInCollection = sDao.getNumInCollection("GrowthRate");
		double[] variance = new double[numInCollection];
		double[] standDev = new double[numInCollection];
		int[] numInSD = new int[numInCollection];
		double mean = 0;
		
		//get each growth loc series and get the variance for each
		for (int i = 0; i < numInCollection; i++) {
			
			double[] series = sDao.getGrowthRateIndex(i);
			
			try {
				variance[i] = r.getVariance(series);
				standDev[i] = Math.sqrt(variance[i]);
				numInSD[i] = sDao.getNumInSD(series, standDev[i]); 
	
				//store the variance
				sDao.insertVariance(variance[i], "LOC");
				sDao.insertNumInSd(numInSD[i], series.length);
				
			} catch (REngineException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (REXPMismatchException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		

		//get the mean of the variances
		try {
		    //mean = r.mean(variance);
			mean = r.median(variance);
		} catch (REngineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (REXPMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//return
		return mean;
	}

	private float[] getHPThree() {
		
		ContributionDao daoC = new ContributionDao();
		IssueDao daoI = new IssueDao();
		
		//get a class (model) of contribution stuff required name etc
		ArrayList<Contributions> contributions = daoC.getContributions();
		
		//get issue class
		ArrayList<Issues> issues = daoI.getIssues();
		
		String[] issueWilks= null;
		String[] additionsWilks=null;
		String[] deletionsWilks=null;
		
		int issuesInThreshold = 0;
		int additionsInThreshold = 0;
		int deletionsInThreshold = 0;

		
		int total =0;
		
		//get shapiro wilks for every projects a,d and i - get p number
		for (int i = 0; i < contributions.size(); i++) {
			
			//get each contribution
			Contributions contribution = contributions.get(i);
			
			//find associated issues
			for (int j = 0; j < issues.size(); j++) {
				Issues issue = issues.get(j);
				
				String [] is = issue.getAllIssues();

				if(issue.getProject().equals(contribution.getProject())){
					
					total++;
					
					//get shapiro for the a,d,i				
					try {
						issueWilks = r.wilks(parseArrayToInt(issue.getAllIssues()));
						additionsWilks = r.wilks(parseArrayToInt(contribution.getAdditions()));
						deletionsWilks = r.wilks(parseArrayToInt(contribution.getDeletions()));
						
					} catch (REngineException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (REXPMismatchException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

					//is p less then 0.05?	- if so increment
					if(Double.parseDouble(issueWilks[1]) <= 0.05){
						issuesInThreshold++;
					}
					if(Double.parseDouble(additionsWilks[1]) <= 0.05){
						additionsInThreshold++;
					}
					if(Double.parseDouble(deletionsWilks[1]) <= 0.05){
						deletionsInThreshold++;
					}
					
					break;
				}
			}
			
			
		}
		
		//find out how many for each category are in the threshold or 0.05
		float[] inThreshold = new float[3];
		inThreshold[0] = (float) ((issuesInThreshold * 100.0) / total);
		inThreshold[1] = (float) ((additionsInThreshold * 100.0) / total);
		inThreshold[2] = (float) ((deletionsInThreshold * 100.0) / total);

		
		return inThreshold;
	}

	private float getHPTwo() {
						
		//get the average interval value for each project
		ArrayList<Double> averages = dao.getGrowthRateAverages();
		
		int total = averages.size();
		int numPositiveGrowth = 0;
		
		for (int i = 0; i < averages.size(); i++) {
			if(averages.get(i) > 0){
				numPositiveGrowth++;
			}
		}
		
		//convert to percentage
		float percentage = (float) ((numPositiveGrowth * 100.0) / total);

		return percentage;
	}
	
	private int[] parseArrayToInt(String[] data){
		int[] parsedArray = new int[data.length];

		for(int i =0;i<data.length;i++){
			parsedArray[i] = Integer.parseInt(data[i]);
		}
		return parsedArray;
	}
	
	private double[] parseArrayToDouble(String[] data) {
		double[] parsedArray = new double[data.length];

		for(int i =0;i<data.length;i++){
			parsedArray[i] = Double.parseDouble(data[i]);
		}
		return parsedArray;
	}
	
	private int[] parseArrayToInt(double[] data) {
		int[] parsedArray = new int[data.length];

		for(int i =0;i<data.length;i++){
			parsedArray[i] = (int) data[i];
		}
		return parsedArray;
	}

}
