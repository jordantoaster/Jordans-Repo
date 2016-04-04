/**
 * @author Jordan McDonald
 *
 * Description - This class provides an interface from which all data extracted from the GITHUB API can be inserted into the database
 * 			     In some cases the data needs to be parsed to split the string sequence into the different parts for each project
 */

package Actions;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Daos.CommitsDao;
import Daos.ForkDao;
import Daos.IssueDao;
import Daos.StarDao;
import Daos.TagDao;
import Models.Commits;
import Models.Forks;
import Models.Issues;
import Models.Stars;
import Models.Tags;

public class StoreGenericAction implements Action{	
	
	public String execute(HttpServletRequest request, HttpServletResponse response) {

		//collects the data from the HTTP request 
		String subAction = request.getParameter("subAction");
		String project = request.getParameter("project");
		String[] data = request.getParameterValues("data[]");
		String[] dates = request.getParameterValues("dates[]");

		//Depending on the input type a different DAO is instantiated and the data is inserted
		if(subAction.equals("commit")){
			Commits commit = new Commits(dates, data, project);		
			CommitsDao dao = new CommitsDao();
			dao.insertCommits(commit, "GithubEvolution");
		}
		if(subAction.equals("star")){
			Stars star = new Stars(dates, data, project);		
			StarDao dao = new StarDao();
			dao.insertStars(star, "GithubEvolution");
		}
		if(subAction.equals("tags")){
			Tags tag = new Tags(dates, data, project);		
			TagDao dao = new TagDao();
			dao.insertStars(tag, "GithubEvolution");
		}
		if(subAction.equals("fork")){
			Forks fork = new Forks(dates, data, project);		
			ForkDao dao = new ForkDao();
			dao.insertForks(fork, "GithubEvolution");
		}
		if(subAction.equals("Issues")){
				
			int startPosition = 0;
			String[] allIssues = null;
			String[] openIssues = null;
			String[] closedIssues = null;
			int count =0;
			
			//parse array to get open, closed, all - each are sent as a single json string so need to be split on a terminating character
			for (int i = 0; i < data.length; i++) {
				
				if(data[i].equals("*")){
					
					if(count == 0){
						//get section of array up to the terminator
						allIssues = parseData(data, startPosition,i);
						startPosition = i + 1;
					}
					
					if(count == 1){
						//get section of array up to the terminator
						openIssues = parseData(data, startPosition,i);
						startPosition = i + 1;
						
					}
					
					if(count == 2){
						
						//get section of array up to the terminator
						closedIssues = parseData(data, startPosition,i);
						startPosition = i + 1;
					}
					
					count++;

				}
			}
			
			//store
			Issues issue = new Issues(dates, openIssues, closedIssues, allIssues, project);		
			IssueDao dao = new IssueDao();
			dao.insertIssues(issue, "GithubEvolution");
		}
		
		if(subAction.equals("closedAt")){
			//store
			Issues issue = new Issues(dates, project, data, subAction);		
			IssueDao dao = new IssueDao();
			dao.insertIssuesClosedAt(issue, "GithubEvolution");
		}
		
		if(subAction.equals("comments")){
			//store
			Issues issue = new Issues(dates, project, data, subAction);		
			IssueDao dao = new IssueDao();
			dao.insertIssuesComments(issue, "GithubEvolution");
		}

		return "insert complete";
	}

	//seperates the string into subsets based upon a terminating character
	private String[] parseData(String[] data, int startPosition, int terminatorPosition) {
		
		int range = terminatorPosition - startPosition;
		
		String[] parsedArray = new String[range];
		
		int parsedIndex = 0;
				
		for(int i =startPosition;i<terminatorPosition;i++){
			parsedArray[parsedIndex] = data[i];
			parsedIndex++;
		}
		
		return parsedArray;
	}

}
