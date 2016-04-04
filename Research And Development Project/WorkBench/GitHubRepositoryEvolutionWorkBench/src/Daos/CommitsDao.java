/**
 * @author Jordan McDonald
 *
 * Description - handles all commit interaction with the database
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
import Models.Contributions;
import Models.Issues;

public class CommitsDao {
	
	//inserts the commit model to the MONGO collection
	public boolean insertCommits(Commits commits, String database){
				
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database,"Commits");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", commits.getDates());
			documentDetail.put("Commits", commits.getCommits());
			documentDetail.put("Project", commits.getProject());

		
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//retrieves a list of commits in the database
	public ArrayList<Commits> getCommits(String database){
		
	    ArrayList<Commits> commitList = new ArrayList<Commits>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database,"Commits");
		    DBCursor cursor = collection.find();
		    Commits commit;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("Project");	
				
			    list = (BasicDBList) obj.get("Commits");			
				String[] arrayParsedCommit =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Dates");			
				String[] arrayParsedDates =parseMongoArray(list);

				commit = new Commits(arrayParsedDates,arrayParsedCommit, project);
				
				commitList.add(commit);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return commitList;	
	}
	
	public boolean deleteCommit(Commits comm, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Commits");
		
		BasicDBObject query = new BasicDBObject();
		query.append("Project", comm.getProject());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject item = cursor.next();
			collection.remove(item);
		}
		
		return true;
	}
	
	public boolean updateCommit(Commits comm, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Commits");
		
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
