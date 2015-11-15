package Actions;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Daos.CommitsDao;
import Daos.ContributionDao;
import Models.Commits;

public class StoreCommitAction implements Action{

	
	/*Holds the split version of the input array*/
	List<Integer> commits = new ArrayList<Integer>();
	List<String> dates  = new ArrayList<String>();
	String project = "";
	
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] commitDetails = request.getParameterValues("input[]");
		
		getData(commitDetails);

		Commits commit = new Commits(dates, commits, project);
		
		CommitsDao dao = new CommitsDao();
		dao.insertCommits(commit);

		return "insert complete";
	}
	
	/*Removes the terminators and splits the main list into each category*/
	public boolean getData(String[] contribDetails) {
		
		int count = 0;
		
		for(int i =0; i<contribDetails.length; i++){
			if(contribDetails[i].equals("#")){
				count++;
			} else {
				if(count == 0){
					commits.add(Integer.parseInt(contribDetails[i]));
				}
				if(count == 1){
					dates.add(contribDetails[i]);
				}
				if(count == 2){
					project = contribDetails[i];
				}
			}		
		}		
		return true;
	}

}
