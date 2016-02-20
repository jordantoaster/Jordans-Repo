package Actions;

import java.util.Arrays;

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
				
		String subAction = request.getParameter("subAction");
		String project = request.getParameter("project");
		String[] data = request.getParameterValues("data[]");
		String[] dates = request.getParameterValues("dates[]");

		
		if(subAction.equals("commit")){
			Commits commit = new Commits(dates, data, project);		
			CommitsDao dao = new CommitsDao();
			dao.insertCommits(commit);
		}
		if(subAction.equals("star")){
			Stars star = new Stars(dates, data, project);		
			StarDao dao = new StarDao();
			dao.insertStars(star);
		}
		if(subAction.equals("tags")){
			Tags tag = new Tags(dates, data, project);		
			TagDao dao = new TagDao();
			dao.insertStars(tag);
		}
		if(subAction.equals("fork")){
			Forks fork = new Forks(dates, data, project);		
			ForkDao dao = new ForkDao();
			dao.insertStars(fork);
		}
		if(subAction.equals("Issues")){
				
			//split array into two - closed + open
			int size = data.length;
			String[] openIssues = Arrays.copyOfRange(data, 0, size/2);
			String[] closedIssues = Arrays.copyOfRange(data, size/2, size);
			
			//store
			Issues issue = new Issues(dates, openIssues, closedIssues, project);		
			IssueDao dao = new IssueDao();
			dao.insertIssues(issue);
		}
		
		if(subAction.equals("closedAt")){
			//store
			Issues issue = new Issues(dates, project, data, subAction);		
			IssueDao dao = new IssueDao();
			dao.insertIssuesClosedAt(issue);
		}
		
		if(subAction.equals("comments")){
			//store
			Issues issue = new Issues(dates, project, data, subAction);		
			IssueDao dao = new IssueDao();
			dao.insertIssuesComments(issue);
		}

		return "insert complete";
	}



}
