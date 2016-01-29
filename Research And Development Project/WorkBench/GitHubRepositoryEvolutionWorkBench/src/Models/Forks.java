package Models;

import java.util.ArrayList;
import java.util.List;

public class Forks {
	private String[]  forks;
	private String[]  dates;
	private String project = "";
	
	public Forks(String[] dates, String[] data, String project){
		this.dates = dates;
		this.forks = data;
		this.project = project;
	}
	
	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getForks() {
		return forks;
	}

	public void setCommits(String[] forks) {
		this.forks = forks;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}

