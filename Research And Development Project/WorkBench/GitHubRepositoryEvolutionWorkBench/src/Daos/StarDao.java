/**
 * @author Jordan McDonald
 *
 * Description - coordinates the star models and the database
 */

package Daos;

import java.util.ArrayList;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoException;

import Models.Stars;
import Models.Stars;

public class StarDao {
	
	//performs an insert
	public boolean insertStars(Stars stars){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Stars");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", stars.getDates());
			documentDetail.put("Stars", stars.getStars());
			documentDetail.put("Project", stars.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//gets all the stars
	public ArrayList<Stars> getStars(){
		
	    ArrayList<Stars> commitList = new ArrayList<Stars>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection("Stars");
		    DBCursor cursor = collection.find();
		    Stars star;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("Project");	
				
			    list = (BasicDBList) obj.get("Stars");			
				String[] arrayParsedStar =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Dates");			
				String[] arrayParsedDates =parseMongoArray(list);

				star = new Stars(arrayParsedDates,arrayParsedStar, project);
				
				commitList.add(star);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return commitList;	
	}
	
	//convert mongo list to string array
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}
}
