package Models;

import java.util.ArrayList;
import java.util.List;

public class Commits {


	private String[]  commits;
	private String[]  dates;
	private String project = "";
	
	public Commits(String[] dates, String[] data, String project){
		this.dates = dates;
		this.commits = data;
		this.project = project;
	}
	
	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getCommits() {
		return commits;
	}

	public void setCommits(String[] commits) {
		this.commits = commits;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}
