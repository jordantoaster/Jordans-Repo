package Models;

import java.util.ArrayList;
import java.util.List;

public class Contributions {
	
	private List<Integer> additions = new ArrayList<Integer>();
	private List<Integer> deletions  = new ArrayList<Integer>();
	private List<Integer> LOC  = new ArrayList<Integer>();
	private List<String> dates  = new ArrayList<String>();
	private String project = "";
	
	public Contributions(List<Integer> additions, List<Integer> deletions, List<Integer> LOC, List<String> dates, String project) {
		this.additions = additions;
		this.deletions = deletions;
		this.LOC = LOC;
		this.dates = dates;
		this.project = project;
	}
	
	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
	
	public List<String> getDates() {
		return dates;
	}

	public void setDates(List<String> dates) {
		this.dates = dates;
	}

	public List<Integer> getAdditions() {
		return additions;
	}

	public void setAdditions(List<Integer> additions) {
		this.additions = additions;
	}

	public List<Integer> getDeletions() {
		return deletions;
	}

	public void setDeletions(List<Integer> deletions) {
		this.deletions = deletions;
	}

	public List<Integer> getLOC() {
		return LOC;
	}

	public void setLOC(List<Integer> lOC) {
		LOC = lOC;
	}
}
