package Actions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Models.Contributions;

public class StoreAction implements Action{
	
	/*Holds the split version of the input array*/
	List<Integer> additions = new ArrayList<Integer>();
	List<Integer> deletions  = new ArrayList<Integer>();
	List<Integer> LOC  = new ArrayList<Integer>();

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] contribDetails = request.getParameterValues("input[]");
		int partitionLength = getPartitionLength(contribDetails);
		
		getData(contribDetails,partitionLength);
		
		Contributions contributions = new Contributions(additions, deletions, LOC);
		
		return "mongo sync complete";
	}

	/*Removes the terminators and splits the main list into each category*/
	private void getData(String[] contribDetails, int partitionLength) {
		
		ArrayList<Integer> adjustedContribDetails = removeTerminator(contribDetails, partitionLength);
		
		additions = adjustedContribDetails.subList(0, partitionLength);
		deletions = adjustedContribDetails.subList(partitionLength, partitionLength*2);
		LOC = adjustedContribDetails.subList(partitionLength*2, partitionLength*3);
	}

	/*returns three datasets, so removes the two terminators but creating a new list without them*/
	private ArrayList<Integer> removeTerminator(String[] contribDetails, int partitionLength) {
		
		ArrayList<Integer> adjustedDetails = new ArrayList<Integer>();
		
		for(int i =0; i<contribDetails.length; i++){
			if(!contribDetails[i].equals("#")){
				adjustedDetails.add(Integer.parseInt(contribDetails[i]));
			}
		}		
		return adjustedDetails;
	}

	/*Gets the length of each data series, by counting up to the first terminator*/
	private int getPartitionLength(String[] contribDetails) {
		
		int count =0;
		
		for(int i =0;i<contribDetails.length;i++){

			if(contribDetails[i].equals("#")){
				break;
			}
			count++;
		}
		
		return count;
	}

}
