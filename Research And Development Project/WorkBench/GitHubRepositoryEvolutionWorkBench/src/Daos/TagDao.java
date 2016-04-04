/**
 * @author Jordan McDonald
 *
 * Description - coordinates the tag models and the mongo database - only includes operations that are required
 */

package Daos;

import java.util.ArrayList;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoException;
import Models.Tags;

public class TagDao {
	
	//performs an insert
	public boolean insertTags(Tags tag, String database){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Tags");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", tag.getDates());
			documentDetail.put("Tags", tag.getTags());
			documentDetail.put("Project", tag.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}

	//retrieves a list of tags in the database
	public ArrayList<Tags> getTags(String database){
		
	    ArrayList<Tags> tagList = new ArrayList<Tags>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database,"Tags");
		    DBCursor cursor = collection.find();
		    Tags tag;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("Project");	
				
			    list = (BasicDBList) obj.get("Tags");			
				String[] arrayParsedCommit =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Dates");			
				String[] arrayParsedDates =parseMongoArray(list);

				tag = new Tags(arrayParsedDates,arrayParsedCommit, project);
				
				tagList.add(tag);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return tagList;	
	}
	
	public boolean deleteTags(Tags comm, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Tags");
		
		BasicDBObject query = new BasicDBObject();
		query.append("Project", comm.getProject());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject item = cursor.next();
			collection.remove(item);
		}
		
		return true;
	}
	
	public boolean updateTags(Tags comm, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Tags");
		
		BasicDBObject query = new BasicDBObject();
		query.append("Project", comm.getProject());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject updateDocument = cursor.next();
			DBObject item = updateDocument;
			updateDocument.put("Project", "edit");
			collection.update(item,updateDocument);
		}
		
		return true;
	}
	//converts a mongo DB list to a traditional string array
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}
}
