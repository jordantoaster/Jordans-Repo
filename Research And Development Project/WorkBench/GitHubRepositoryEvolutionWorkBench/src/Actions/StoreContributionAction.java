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


	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println();
		
		
		String[] additions = request.getParameterValues("additions[]");
		String[] deletions = request.getParameterValues("deletions[]");
		String[] difference = request.getParameterValues("difference[]");
		String[] LOCOverTIme = request.getParameterValues("LOCOverTime[]");
		String[] contributionDates = request.getParameterValues("contributionDates[]");
		String project = request.getParameter("project");
				
		Contributions contributions = new Contributions(additions, deletions, difference, LOCOverTIme, contributionDates, project);
		
		ContributionDao dao = new ContributionDao();
		dao.insertContributions(contributions);
		
		return "mongo sync complete";
	}

}
