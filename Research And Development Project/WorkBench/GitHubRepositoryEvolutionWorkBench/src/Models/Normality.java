package Models;

public class Normality {
	
	String projectName = "";
	String wilks = "";
	String wilksP = "";
	String normalityType = "";
	
	public Normality(String project, String[] normality, String type) {
		this.projectName = project;
		this.wilks = normality[0];
		this.wilksP = normality[1];
		this.normalityType = type;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getNormalityType() {
		return normalityType;
	}
	public void setNormalityType(String normalityType) {
		this.normalityType = normalityType;
	}	
	public String getWilks() {
		return wilks;
	}
	public void setWilks(String wilks) {
		this.wilks = wilks;
	}
	public String getWilksP() {
		return wilksP;
	}
	public void setWilksP(String wilksP) {
		this.wilksP = wilksP;
	}
	
}
