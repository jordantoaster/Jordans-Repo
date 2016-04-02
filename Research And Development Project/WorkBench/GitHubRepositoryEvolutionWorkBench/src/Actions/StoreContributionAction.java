/**
 * @author Jordan McDonald
 *
 * Description - extracts the data from the request and uses a DAO instance to insert the contribution into the database
 */

package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Daos.ContributionDao;
import Models.Contributions;

public class StoreContributionAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {		
		
		//get the data from the HTTP request
		String[] additions = request.getParameterValues("additions[]");
		String[] deletions = request.getParameterValues("deletions[]");
		String[] difference = request.getParameterValues("difference[]");
		String[] LOCOverTIme = request.getParameterValues("LOCOverTime[]");
		String[] contributionDates = request.getParameterValues("contributionDates[]");
		String project = request.getParameter("project");
				
		//a java bean that represents a system side model of the contribution data
		Contributions contributions = new Contributions(additions, deletions, difference, LOCOverTIme, contributionDates, project);
		
		//perform an insert to MONGODB
		ContributionDao dao = new ContributionDao();
		dao.insertContributions(contributions);
		
		//feedback message
		return "mongo sync complete";
	}

}
