package Actions;

import java.util.Arrays;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;

import com.google.gson.Gson;

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
			String[] mean = new String[5];
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
			
			//store mean
			
			//return mean to client
			return combinedMean;
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
}
