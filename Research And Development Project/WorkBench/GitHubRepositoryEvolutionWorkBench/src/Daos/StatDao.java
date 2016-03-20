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
import Models.Stars;

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
	
	public ArrayList<GrowthRateModel> getGrowthRate(){
		
	    ArrayList<GrowthRateModel> commitList = new ArrayList<GrowthRateModel>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection("GrowthRate");
		    DBCursor cursor = collection.find();
		    GrowthRateModel growth;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("ProjectName");	
				
				String type =(String) obj.get("MetricType");
				
				list = (BasicDBList) obj.get("GrowthRate");	
				double[] parsedGrowth = convertToDouble(list);
				
				double absGrowth = (Double) obj.get("AbsoluteGrowth");
				
				double growthOverTime =(Double) obj.get("GrowthRateOverTime");

				growth = new GrowthRateModel(project, type, parsedGrowth, growthOverTime,absGrowth);
				
				commitList.add(growth);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return commitList;	
	}
	
	public double[] convertToDouble(BasicDBList list){
		
		double[] listD = new double[list.size()];
		
		for (int i = 0; i < list.size(); i++) {
			listD[i] = (double) list.get(i);
		}
		
		return listD;		
	}
	
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}

	public boolean insertVariance(double variance) {
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Variance");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Variance", variance);
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;
		
	}

	public void getCross() {
		DBCollection collection = new dbConnectionBuilder().getMongoCollection("StandardDeviation");
		
		DBCursor cursor = collection.find();
		while (cursor.hasNext()) {
		   BasicDBObject obj = (BasicDBObject) cursor.next();
			   System.out.println(obj.getString("SD"));
		}
						
	}

	public int getNumInSD(double[] series, double stanDev) {

		int count = 0;
		for (int i = 0; i < series.length; i++) {
			if(series[i] < stanDev){
				count++;
			}
		}
		
		return count;
	}

	public boolean insertNumInSd(int i, int length) {
		
		float percentage = (float) ((i * 100.0) / length);

		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("StandardDeviation");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("SD", percentage);

	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
		
	}

}
