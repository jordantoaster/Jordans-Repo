package Models;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Contributions {
	


	private String[]  additions;
	private String[]  deletions;
	private String[]  difference;
	private String[]  LOC;
	private String[]  dates;
	private String project = "";
	
	public Contributions(String[] additions, String[] deletions, String[] difference, String[] LOC,
			String[] dates, String project) {
		
		this.additions = Arrays.copyOf(additions, additions.length);
		this.deletions = Arrays.copyOf(deletions, deletions.length);
		this.difference = Arrays.copyOf(difference, difference.length);
		this.LOC = Arrays.copyOf(LOC, LOC.length);
		this.dates = Arrays.copyOf(dates, dates.length);
		this.project = project;
	}
	
	public String[] getDifference() {
		return difference;
	}

	public void setDifference(String[] difference) {
		this.difference = difference;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
	
	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getAdditions() {
		return additions;
	}

	public void setAdditions(String[] additions) {
		this.additions = additions;
	}

	public String[] getDeletions() {
		return deletions;
	}

	public void setDeletions(String[] deletions) {
		this.deletions = deletions;
	}

	public String[] getLOC() {
		return LOC;
	}

	public void setLOC(String[] lOC) {
		LOC = lOC;
	}
}
