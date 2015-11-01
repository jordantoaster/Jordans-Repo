package Models;

import java.util.ArrayList;
import java.util.List;

public class Contributions {
	
	List<Integer> additions = new ArrayList<Integer>();
	List<Integer> deletions  = new ArrayList<Integer>();
	List<Integer> LOC  = new ArrayList<Integer>();
	
	public Contributions(List<Integer> additions, List<Integer> deletions, List<Integer> LOC) {
		this.additions = additions;
		this.deletions = deletions;
		this.LOC = LOC;
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
