package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;

import Models.Correlation;
import Models.Mean;

public class StatDao {
	public boolean insertMean(Mean mean){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Mean");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Mean", mean.getMean());
			documentDetail.put("ProjectName", mean.getProjectName());
			documentDetail.put("MeanType", mean.getMeanType());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	public boolean insertCorrelation(Correlation correlation){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Correlation");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Mean", correlation.getPearsons());
			documentDetail.put("ProjectNameA", correlation.getSeriesAName());
			documentDetail.put("ProjectNameB", correlation.getSeriesBName());
			documentDetail.put("SeriesAType", correlation.getTypeOne());
			documentDetail.put("SeriesBType", correlation.getTypeTwo());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
}
