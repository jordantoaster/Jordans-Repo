package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import StatisticsR.RConnectionDarwin;

public class StatsAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {

		String subAction = request.getParameter("subAction");
		String[] projects = request.getParameterValues("projectNames[]");
		String[] data = request.getParameterValues("data[]");
		RConnectionDarwin R = new RConnectionDarwin();
		
		if(subAction.equals("mean")){
			
			//holds the means
			int[] mean = new int[data.length];
			
			//convert to int?
			
			//loop all sets in aray 	//get mean
			for(int i =0; i<data.length;i++){
				//get mean
				//mean[i] =  R.mean(data[i]);
			}
			
			//store mean
			
			//return mean to client
		}
		
		return null;
	}

}
