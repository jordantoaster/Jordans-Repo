package Actions;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Daos.LawsDao;

public class LawsAction implements Action {
	
	LawsDao dao = new LawsDao();
	
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		//get HP1
		
		
		//get HP2
		float hpTwoResult = getHPTwo();

		
		//get HP3

		
		//get HP4

		
		//get HP5

		
		//get HP6


		String t = String.format("{ \"hpTwo\": \"%s\"}", hpTwoResult);
		return t;
	}

	private float getHPTwo() {
						
		//get the average interval value for each project
		ArrayList<Double> averages = dao.getGrowthRateAverages();
		
		int total = averages.size();
		int numPositiveGrowth = 0;
		
		for (int i = 0; i < averages.size(); i++) {
			if(averages.get(i) > 0){
				numPositiveGrowth++;
			}
		}
		
		//convert to percentage
		float percentage = (float) ((numPositiveGrowth * 100.0) / total);

		return percentage;
	}

}
