package Actions;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;

import com.mongodb.BasicDBList;

import Daos.ContributionDao;
import Daos.IssueDao;
import Daos.LawsDao;
import Daos.StatDao;
import Models.Contributions;
import Models.Issues;
import StatisticsR.RConnectionDarwin;

public class LawsAction implements Action {
	
	LawsDao dao = new LawsDao();
	StatDao sDao = new StatDao();
	RConnectionDarwin r = new RConnectionDarwin();
	
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		//get law 1 and 6
		
		
		//get Law 2
		float hpTwoResult = getHPTwo();

		
		//get Law 3
		float[] hpThreeResult = getHPThree();
		
		
		//get law 4
		double hpFourResult = getHPFour();

		
		//get HP5

		
		//get HP6


		String t = String.format("{ \"hpTwo\": \"%s\", \"hpThreeI\": \"%s\", \"hpThreeA\": \"%s\", \"hpThreeD\": \"%s\", \"hpFour\": \"%s\"}", 
				hpTwoResult, hpThreeResult[0],hpThreeResult[1],hpThreeResult[2],hpFourResult);
		return t;
	}

	private double getHPFour() {
		
		int numInCollection = sDao.getNumInCollection("GrowthRate");
		double[] variance = new double[numInCollection];
		double mean = 0;
		
		//get each growth loc series and get the variance for each
		for (int i = 0; i < numInCollection; i++) {
			
			double[] series = sDao.getGrowthRateIndex(i);
			
			try {
				variance[i] = r.getVariance(series);
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
		    mean = r.mean(variance);
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
				//for (int k = 0; k < is.length; k++) {
					//System.out.print(is[k] + ", ");
				//} 
				
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
					
					//System.out.println(Double.parseDouble(issueWilks[1]));
					//System.out.println(additionsWilks[1]);
					//System.out.println(deletionsWilks[1]);

					
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

}
