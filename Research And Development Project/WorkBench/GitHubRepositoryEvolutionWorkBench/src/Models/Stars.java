package Models;

import java.util.ArrayList;
import java.util.List;

public class Stars {
	private List<String> dates = new ArrayList<String>();
	private List<Integer> stars  = new ArrayList<Integer>();
	private String project = "";
	
	public Stars(List<String> dates, List<Integer> stars, String project){
		this.dates = dates;
		this.stars = stars;
		this.project = project;
	}
	
	public List<String> getDates() {
		return dates;
	}

	public void setDates(List<String> dates) {
		this.dates = dates;
	}

	public List<Integer> getStars() {
		return stars;
	}

	public void setCommits(List<Integer> stars) {
		this.stars = stars;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}

