package Daos;

import java.util.ArrayList;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoException;

import Models.Correlation;
import Models.GrowthRateModel;
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
	
	public int[] getAllMean(String meanType) {
		DBCollection collection = new dbConnectionBuilder().getMongoCollection("Mean");
	    ArrayList<Integer> means = new ArrayList();
		
		DBCursor cursor = collection.find();
		while (cursor.hasNext()) {
		   BasicDBObject obj = (BasicDBObject) cursor.next();
		   if(obj.getString("MeanType").equals(meanType)){
			   means.add(Integer.parseInt(obj.getString("Mean")));
		   }
		}
		
		int[] fixedMeans = new int[means.size()];
		for(int i=0; i<means.size();i++){
			fixedMeans[i] = means.get(i);
		}
		
		return fixedMeans;
	}
	
	public boolean insertCorrelation(Correlation correlation){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Correlation");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Pearson", correlation.getPearsons());
			documentDetail.put("Spearman", correlation.getSpearman());
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

	public boolean insertGrowthRate(GrowthRateModel growthRateModel) {
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("GrowthRate");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("ProjectName", growthRateModel.getProjectName());
			documentDetail.put("MetricType", growthRateModel.getMetricType());
			documentDetail.put("GrowthRate", growthRateModel.getGrowth());
			documentDetail.put("AbsoluteGrowth", growthRateModel.getAbsGrowth());
			documentDetail.put("GrowthRateOverTime", growthRateModel.getGrowthOverTime());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;		
	}
}
