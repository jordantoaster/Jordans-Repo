package Models;

import java.util.ArrayList;
import java.util.List;

public class Issues {
	private String[]  issues;
	private String[]  dates;
	private String project = "";
	
	public Issues(String[] dates, String[] data, String project){
		this.dates = dates;
		this.issues = data;
		this.project = project;
	}
	
	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getIssues() {
		return issues;
	}

	public void setCommits(String[] issues) {
		this.issues = issues;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}

