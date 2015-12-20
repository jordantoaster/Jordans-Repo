package Models;

import java.util.ArrayList;
import java.util.List;

public class Stars {
	private String[]  stars;
	private String[]  dates;
	private String project = "";
	
	public Stars(String[] dates, String[] data, String project){
		this.dates = dates;
		this.stars = data;
		this.project = project;
	}
	
	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getStars() {
		return stars;
	}

	public void setCommits(String[] stars) {
		this.stars = stars;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}

