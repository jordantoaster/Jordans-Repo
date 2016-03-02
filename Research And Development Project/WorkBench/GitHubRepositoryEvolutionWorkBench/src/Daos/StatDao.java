package Daos;

import java.util.ArrayList;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoException;

import Models.Correlation;
import Models.GrowthRateModel;
import Models.Mean;
import Models.Normality;

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
	
	public boolean insertCrossCorr(double correlation, String project, String typeOne, String typeTwo){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("CrossCorr");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("CrossCorr", correlation);
			documentDetail.put("ProjectName", project);
			documentDetail.put("TypeOne", typeOne);
			documentDetail.put("TypeTwo", typeTwo);
	
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
			documentDetail.put("PearsonPval", correlation.getPPVal());
			documentDetail.put("spearmanPval", correlation.getSPVal());
	
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

	public boolean insertNormality(Normality normalityModel) {
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Normality");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("ProjectName", normalityModel.getProjectName());
			documentDetail.put("NormalityType", normalityModel.getNormalityType());
			documentDetail.put("Wilks", normalityModel.getWilks());
			documentDetail.put("WilksP", normalityModel.getWilksP());

	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;		
	}
	
	public int getNumInCollection(String collectionName){
		
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(collectionName);
		
		try {

			DBCursor cursor = collection.find();
			return cursor.count();
			
		} catch(MongoException e){
			System.out.println(e);
			return 0;
		}	
	}

	
	public double[] getGrowthRateIndex(int index){

		int counter =0;
		
		try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection("GrowthRate");			
		    DBCursor cursor = collection.find();
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
				//get growth rate list
				BasicDBList list = (BasicDBList) cursor.next().get("GrowthRate");
				
				if(counter == index){	
					
					double[] listD = convertToDouble(list);
					
					
					return listD;
				}
				
				counter++;
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		return null;
	}
	
	public double[] convertToDouble(BasicDBList list){
		
		double[] listD = new double[list.size()];
		
		for (int i = 0; i < list.size(); i++) {
			listD[i] = (double) list.get(i);
		}
		
		return listD;		
	}

}
