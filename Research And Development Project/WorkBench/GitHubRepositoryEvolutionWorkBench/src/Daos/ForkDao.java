/**
 * @author Jordan McDonald
 *
 * Description - handles the required fork/DAO functionality - in this case an insert
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
import Models.Forks;

public class ForkDao {
	
	public boolean insertForks(Forks fork, String database){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Forks");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", fork.getDates());
			documentDetail.put("Forks", fork.getForks());
			documentDetail.put("Project", fork.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//retrieves a list of commits in the database
		public ArrayList<Forks> getForks(String database){
			
		    ArrayList<Forks> forkList = new ArrayList<Forks>();
			
		    try {
				DBCollection collection = new dbConnectionBuilder().getMongoCollection(database,"Forks");
			    DBCursor cursor = collection.find();
			    Forks fork;
			    BasicDBList list;
			
			    //allows iteration of every doc in the collection
				while (cursor.hasNext()) {
					
				    BasicDBObject obj = (BasicDBObject) cursor.next();

					//Get all the data from mongo and convert to java structures
					String project = (String) obj.get("Project");	
					
				    list = (BasicDBList) obj.get("Forks");			
					String[] arrayParsedCommit =parseMongoArray(list);
					
					list = (BasicDBList) obj.get("Dates");			
					String[] arrayParsedDates =parseMongoArray(list);

					fork = new Forks(arrayParsedDates,arrayParsedCommit, project);
					
					forkList.add(fork);
				}
				
			} catch(MongoException e){
				System.out.println(e);
			}
			

			return forkList;	
		}
		
		public boolean deleteFork(Forks fork, String database){
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Forks");
			
			BasicDBObject query = new BasicDBObject();
			query.append("Project", fork.getProject());
					
			DBCursor cursor = collection.find(query);
			while (cursor.hasNext()) {
				DBObject item = cursor.next();
				collection.remove(item);
			}
			
			return true;
		}
		
		public boolean updateFork(Forks comm, String database){
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Forks");
			
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
