package Models;

public class GrowthRateModel {

	String projectName = "";
	String metricType = "";
	int[] growth;
	
	public GrowthRateModel(String pName, String mType, int[] gRate){
		this.projectName = pName;
		this.metricType = mType;
		this.growth = gRate;
	}
	
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getMetricType() {
		return metricType;
	}
	public void setMetricType(String projectType) {
		this.metricType = projectType;
	}
	public int[] getGrowth() {
		return growth;
	}
	public void setGrowth(int[] growth) {
		this.growth = growth;
	}
	
}
