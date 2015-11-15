package Models;

import java.util.ArrayList;
import java.util.List;

public class Commits {

	private List<String> dates = new ArrayList<String>();
	private List<Integer> commits  = new ArrayList<Integer>();
	private String project = "";
	
	public Commits(List<String> dates, List<Integer> commits, String project){
		this.dates = dates;
		this.commits = commits;
		this.project = project;
	}
	
	public List<String> getDates() {
		return dates;
	}

	public void setDates(List<String> dates) {
		this.dates = dates;
	}

	public List<Integer> getCommits() {
		return commits;
	}

	public void setCommits(List<Integer> commits) {
		this.commits = commits;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}
