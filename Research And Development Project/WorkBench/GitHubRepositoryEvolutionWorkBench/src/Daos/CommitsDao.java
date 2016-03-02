package Daos;

import java.util.ArrayList;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoException;
import Models.Commits;
import Models.Issues;

public class CommitsDao {
	
	public boolean insertCommits(Commits commits){
				
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Commits");
		
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
	
	public ArrayList<Commits> getCommits(){
		
	    ArrayList<Commits> commitList = new ArrayList<Commits>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection("Commits");
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
	
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}
	
}
