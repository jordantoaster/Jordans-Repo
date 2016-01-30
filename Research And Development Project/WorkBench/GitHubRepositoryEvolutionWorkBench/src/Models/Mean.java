package Models;

public class Mean {
	
	String projectName = "";
	int mean = 0;
	String meanType = "";
	
	public Mean(String pName, int mean, String type){
		this.projectName = pName;
		this.mean = mean;
		this.meanType = type;
	}

	public String getMeanType() {
		return meanType;
	}
	public void setMeanType(String meanType) {
		this.meanType = meanType;
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
