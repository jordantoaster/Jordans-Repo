package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Daos.CommitsDao;
import Daos.StarDao;
import Models.Commits;
import Models.Stars;

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


		return "insert complete";
	}
	

}
