package Models;

import java.util.ArrayList;
import java.util.List;

public class Issues {
	
	private String[]  openIssues;
	private String[]  closedIssues;
	private String[]  dates;
	private String project = "";
	private String[] closedAt;
	private String[] comments;
	
	public Issues(String[] dates, String project, String[] data, String subAction){
		if(subAction.equals("closedAt")){
			this.dates = dates;
			this.project = project;
			this.closedAt = data;
		}
		
		if(subAction.equals("comments")){
			this.dates = dates;
			this.project = project;
			this.comments = data;
		}

	}
	
	public Issues(String[] dates, String[] data, String[] dataTwo, String project) {
		this.dates = dates;
		this.openIssues = data;
		this.closedIssues = dataTwo;
		this.project = project;
	}
	
	public String[] getComments() {
		return comments;
	}

	public void setComments(String[] comments) {
		this.comments = comments;
	}

	
	public String[] getClosedAt() {
		return closedAt;
	}

	public void setClosedAt(String[] closedAt) {
		this.closedAt = closedAt;
	}

	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getIssues() {
		return openIssues;
	}

	public void setCommits(String[] issues) {
		this.openIssues = issues;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
	
	public String[] getClosedIssues() {
		return closedIssues;
	}

	public void setClosedIssues(String[] closedIssues) {
		this.closedIssues = closedIssues;
	}
}

