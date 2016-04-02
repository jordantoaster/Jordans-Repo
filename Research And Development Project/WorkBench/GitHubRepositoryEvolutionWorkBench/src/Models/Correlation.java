/**
 * @author Jordan McDonald
 *
 * Description - Java bean to represent a single correlation instance - provides mutators and accessors methods
 */

package Models;

public class Correlation {
	
	String SeriesAName = "";
	String SeriesBName = "";
	String Pearsons = "";
	String Spearman = "";
	String PPVal = "";
	String SPVal = "";
	String TypeOne = "";
	String TypeTwo = "";
	
	public Correlation(String Sa, String Sb, String p, String t1, String t2, String s, String pP, String sP){
		this.SeriesAName = Sa;
		this.SeriesBName = Sb;
		this.Pearsons = p;
		this.TypeOne = t1;
		this.TypeTwo = t2;
		this.Spearman = s;
		this.PPVal = pP;
		this.SPVal = sP;
	}
	
	public String getPPVal() {
		return PPVal;
	}

	public void setPPVal(String pPVal) {
		PPVal = pPVal;
	}

	public String getSPVal() {
		return SPVal;
	}

	public void setSPVal(String sPVal) {
		SPVal = sPVal;
	}
	
	public String getTypeOne() {
		return TypeOne;
	}

	public void setTypeOne(String typeOne) {
		TypeOne = typeOne;
	}

	public String getTypeTwo() {
		return TypeTwo;
	}

	public void setTypeTwo(String typeTwo) {
		TypeTwo = typeTwo;
	}
	
	public String getSeriesAName() {
		return SeriesAName;
	}
	public void setSeriesAName(String seriesAName) {
		SeriesAName = seriesAName;
	}
	public String getSeriesBName() {
		return SeriesBName;
	}
	public void setSeriesBName(String seriesBName) {
		SeriesBName = seriesBName;
	}
	public String getPearsons() {
		return Pearsons;
	}
	public void setPearsons(String pearsons) {
		Pearsons = pearsons;
	}
	public String getSpearman() {
		return Spearman;
	}
	public void setSpearman(String spearman) {
		Spearman = spearman;
	}

}
