package Actions;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Daos.CommitsDao;
import Daos.ContributionDao;
import Daos.StarDao;
import Models.Commits;
import Models.Stars;

public class StoreGenericAction implements Action{

	
	/*Holds the split version of the input array*/
	List<Integer> data = new ArrayList<Integer>();
	List<String> dates  = new ArrayList<String>();
	String project = "";
	String action = "";
	
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] dataDetails = request.getParameterValues("input[]");
		
		getData(dataDetails);

		
		if(action.equals("commit")){
			Commits commit = new Commits(dates, data, project);		
			CommitsDao dao = new CommitsDao();
			dao.insertCommits(commit);
		}
		if(action.equals("star")){
			Stars star = new Stars(dates, data, project);		
			StarDao dao = new StarDao();
			dao.insertStars(star);
		}


		return "insert complete";
	}
	
	/*Removes the terminators and splits the main list into each category*/
	public boolean getData(String[] dataDetails) {
		
		int count = 0;
		
		for(int i =0; i<dataDetails.length; i++){
			if(dataDetails[i].equals("#")){
				count++;
			} else {
				if(count == 0){
					data.add(Integer.parseInt(dataDetails[i]));
				}
				if(count == 1){
					dates.add(dataDetails[i]);
				}
				if(count == 2){
					project = dataDetails[i];
				}
				if(count == 3){
					action = dataDetails[i];
				}
			}		
		}		
		return true;
	}

}
