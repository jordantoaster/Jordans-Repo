/**
 * @author Jordan McDonald
 *
 * Description - coordinates the database and law operations that are not covered by other Dao instances
 */

package Daos;

import java.util.ArrayList;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoException;

import Models.Commits;
import Models.GrowthRateModel;
import Models.Mean;

public class LawsDao {
	
	//insert growth rate values
	public boolean insertGrowthRate(GrowthRateModel growthRateModel, String db) {
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(db,"GrowthRate");
		
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
	
	public ArrayList<Double> getGrowthRateAverages(String database){
		
		ArrayList<Double> averages = new ArrayList<Double>();
		
		try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "GrowthRate");			
		    DBCursor cursor = collection.find();
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();		    
				
				//add average to overall list
				averages.add((Double) obj.get("GrowthRateOverTime"));
			}
			
		} catch(MongoException e){
			System.out.println(e);
			return averages;
		}
		
		return averages;	
	}
	
	public boolean deleteGrowth(GrowthRateModel comm, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "GrowthRate");
		
		BasicDBObject query = new BasicDBObject();
		query.append("Project", comm.getProjectName());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject item = cursor.next();
			collection.remove(item);
		}
		
		return true;
	}
	
	public boolean updateGrowth(GrowthRateModel comm, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "GrowthRate");
		
		BasicDBObject query = new BasicDBObject();
		query.append("Project", comm.getProjectName());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject updateDocument = cursor.next();
			DBObject item = updateDocument;
			updateDocument.put("Project", "edit");
			collection.update(item,updateDocument);
		}
		
		return true;
	}

	private double getAverageListValue(BasicDBList list) {

		double total = 0;
		int size = list.size();
		
		for(int i =0; i<size; i++){
			total += (double)list.get(i);
		}
		
		double average = total / size; 
		
		return average;
	}

}
