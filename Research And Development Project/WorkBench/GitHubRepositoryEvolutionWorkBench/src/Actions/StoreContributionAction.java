package Actions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Daos.ContributionDao;
import Models.Contributions;

public class StoreContributionAction implements Action{
	
	/*Holds the split version of the input array*/
	List<Integer> additions = new ArrayList<Integer>();
	List<Integer> deletions  = new ArrayList<Integer>();
	List<Integer> LOC  = new ArrayList<Integer>();
	List<String> dates  = new ArrayList<String>();
	String project = "";


	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] contribDetails = request.getParameterValues("input[]");
		
		getData(contribDetails);
		
		Contributions contributions = new Contributions(additions, deletions, LOC, dates, project);
		
		ContributionDao dao = new ContributionDao();
		dao.insertContributions(contributions);
		
		return "mongo sync complete";
	}

	/*Removes the terminators and splits the main list into each category*/
	public boolean getData(String[] contribDetails) {
		
		int count = 0;
		
		for(int i =0; i<contribDetails.length; i++){
			if(contribDetails[i].equals("#")){
				count++;
			} else {
				if(count == 0){
					additions.add(Integer.parseInt(contribDetails[i]));
				}
				if(count == 1){
					deletions.add(Integer.parseInt(contribDetails[i]));
				}
				if(count == 2){
					LOC.add(Integer.parseInt(contribDetails[i]));
				}
				if(count == 3){
					dates.add(contribDetails[i]);
				}
				if(count == 4){
					project = contribDetails[i];
				}
			}		
		}		
		return true;
	}
}
