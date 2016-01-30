package Models;

public class Correlation {
	
	String SeriesAName = "";
	String SeriesBName = "";
	String Pearsons = "";
	String Spearman = "";
	String TypeOne = "";
	String TypeTwo = "";
	
	public Correlation(String Sa, String Sb, String p, String t1, String t2){
		this.SeriesAName = Sa;
		this.SeriesBName = Sb;
		this.Pearsons = p;
		this.TypeOne = t1;
		this.TypeTwo = t2;
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
