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
import com.mongodb.MongoException;

import Models.Mean;

public class LawsDao {
	
	
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
