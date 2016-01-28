package Actions;

import java.util.Arrays;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;

import com.google.gson.Gson;

import Daos.StatDao;
import Models.Correlation;
import Models.Mean;
import StatisticsR.RConnectionDarwin;

public class StatsAction implements Action{
	

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {

		String subAction = request.getParameter("subAction");
		String[] projects = request.getParameterValues("projectNames[]");
				
		RConnectionDarwin r = new RConnectionDarwin();

		String[] data = request.getParameterValues("data[]");

		
		if(subAction.equals("mean")){
			
			//holds the means
			String[] mean = new String[projects.length];
			int[] dataSubset = null;
			int startPosition = 0;
			int meanCounter = 0;
						
			//loop all sets in array 	
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
				Mean meanModel = new Mean(projects[i],Integer.parseInt(mean[i]));
				dao.insertMean(meanModel);
			}
			
			//return mean to client
			return combinedMean;
		}
		if(subAction.equals("correlation")){

			String correlation = "";
			String[] dataTwo = request.getParameterValues("dataTwo[]");
			
			//convert to int arrays
			int[] SeriesA = parseArrayToInt(data);
			int[] SeriesB = parseArrayToInt(dataTwo);

			//get correlation
			try {
				correlation =  r.pearsonCorr(SeriesA, SeriesB);
			} catch (REngineException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (REXPMismatchException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			//store
			StatDao dao = new StatDao();

			Correlation correlationModel = new Correlation(projects[0],projects[1],correlation);
			dao.insertCorrelation(correlationModel);
			
			return correlation; 
		}
		
		return null;
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
