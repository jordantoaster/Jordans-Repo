/**
 * @author Jordan McDonald
 *
 * Description - Java bean to model tag data for a single project instance
 */

package Models;

public class Tags {
	private String[]  tags;
	private String[]  dates;
	private String project = "";
	
	public Tags(String[] dates, String[] data, String project){
		this.dates = dates;
		this.tags = data;
		this.project = project;
	}
	
	public String[] getDates() {
		return dates;
	}

	public void setDates(String[] dates) {
		this.dates = dates;
	}

	public String[] getTags() {
		return tags;
	}

	public void setCommits(String[] tags) {
		this.tags = tags;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}
}

