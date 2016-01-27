package Models;

public class Mean {
	
	String projectName = "";
	int mean = 0;


	public Mean(String pName, int mean){
		this.projectName = pName;
		this.mean = mean;
	}
	
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public int getMean() {
		return mean;
	}
	public void setMean(int mean) {
		this.mean = mean;
	}


}
