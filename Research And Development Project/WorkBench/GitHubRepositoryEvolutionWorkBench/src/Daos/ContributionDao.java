/**
 * @author Jordan McDonald
 *
 * Description - coordinates contribution model interaction with MONGODB
 */

package Daos;

import java.util.ArrayList;

import org.bson.Document;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoException;

import Models.Contributions;
import Models.User;

public class ContributionDao {
	
	//inserts a java bean to the database collection
	public boolean insertContributions(Contributions contributions, String database){
				
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Contributions");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Additions", contributions.getAdditions());
			documentDetail.put("Deletions", contributions.getDeletions());
			documentDetail.put("Difference", contributions.getDifference());
			documentDetail.put("Loc", contributions.getLOC());
			documentDetail.put("Dates", contributions.getDates());
			documentDetail.put("Project", contributions.getProject());

		
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//retreives all instances of contributions from the DB
	public ArrayList<Contributions> getContributions(String database){
		
	    ArrayList<Contributions> contributions = new ArrayList<Contributions>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Contributions");
		    DBCursor cursor = collection.find();
		    Contributions contri;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("Project");	
				
			    list = (BasicDBList) obj.get("Additions");			
				String[] arrayParsedAdditions =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Deletions");			
				String[] arrayParsedDeletions =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Difference");			
				String[] arrayParsedDifference =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Dates");			
				String[] arrayParsedDates =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Loc");			
				String[] arrayParsedLoc =parseMongoArray(list);


				contri = new Contributions(arrayParsedAdditions, arrayParsedDeletions, arrayParsedDifference, arrayParsedLoc, 
						arrayParsedDates,project);
				
				contributions.add(contri);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return contributions;	
	}
	
	public boolean deleteContributions(Contributions contr, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Contributions");
		
		BasicDBObject query = new BasicDBObject();
		query.append("Project", contr.getProject());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject item = cursor.next();
			collection.remove(item);
		}
		
		return true;
	}

	
	//convert a mongo list to a java array
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}

	
}
