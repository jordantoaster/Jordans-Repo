package Models;

public class GrowthRateModel {

	String projectName = "";
	String metricType = "";
	double[] growth;
	double growthOverTime = 0.0;
	double absGrowth = 0.0;

	
	public GrowthRateModel(String pName, String mType, double[] gRate, double growthOverTime,
			double absoluteGrowthRate) {
		
		this.projectName = pName;
		this.metricType = mType;
		this.growth = gRate;
		this.growthOverTime = growthOverTime;
		this.absGrowth = absoluteGrowthRate;
		
	}

	public double getGrowthOverTime() {
		return growthOverTime;
	}

	public void setGrowthOverTime(double growthOverTime) {
		this.growthOverTime = growthOverTime;
	}

	public double getAbsGrowth() {
		return absGrowth;
	}

	public void setAbsGrowth(double absGrowth) {
		this.absGrowth = absGrowth;
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
	public double[] getGrowth() {
		return growth;
	}
	public void setGrowth(double[] growth) {
		this.growth = growth;
	}
	
}
