/**
 * @author Jordan McDonald
 *
 * Description - coordinates the Mongo database and the various issue permutations
 */

package Daos;

import java.util.ArrayList;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoException;
import Models.Contributions;
import Models.Issues;
import Models.Stars;

public class IssueDao {
	//performs in insert operation
	public boolean insertIssues(Issues issue, String database){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Issues");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", issue.getDates());
			documentDetail.put("openIssues", issue.getIssues());
			documentDetail.put("closedIssues", issue.getClosedIssues());
			documentDetail.put("allIssues", issue.getAllIssues());
			documentDetail.put("Project", issue.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//inserts a different issue permutation
	public boolean insertIssuesClosedAt(Issues issue, String database){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "IssuesClosedAt");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", issue.getDates());
			documentDetail.put("closedAtIssues", issue.getClosedAt());
			documentDetail.put("Project", issue.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//inserts another issue variation
	public boolean insertIssuesComments(Issues issue, String database){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "IssueComments");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", issue.getDates());
			documentDetail.put("Comments", issue.getComments());
			documentDetail.put("Project", issue.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
	//gets all the standard issue type from the DB
	public ArrayList<Issues> getIssues(String database){
		
	    ArrayList<Issues> issueList = new ArrayList<Issues>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Issues");
		    DBCursor cursor = collection.find();
		    Issues issue;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("Project");	
				
			    list = (BasicDBList) obj.get("openIssues");			
				String[] arrayParsedOpen =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("closedIssues");			
				String[] arrayParsedClosed =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("allIssues");			
				String[] arrayParsedAll =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Dates");			
				String[] arrayParsedDates =parseMongoArray(list);

				issue = new Issues(arrayParsedDates, arrayParsedOpen, arrayParsedClosed, arrayParsedAll, project);
				
				issueList.add(issue);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return issueList;	
	}
	
	//parse mongo list to java array
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}

	//gets the issue comments from the collection
	public ArrayList<Issues> getIssuesComments(String database) {
	    ArrayList<Issues> issueList = new ArrayList<Issues>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "IssueComments");
		    DBCursor cursor = collection.find();
		    Issues issue;
		    BasicDBList list;
		
		    //allows iteration of every doc in the collection
			while (cursor.hasNext()) {
				
			    BasicDBObject obj = (BasicDBObject) cursor.next();

				//Get all the data from mongo and convert to java structures
				String project = (String) obj.get("Project");	
				
			    list = (BasicDBList) obj.get("Comments");			
				String[] arrayParsedComments =parseMongoArray(list);
				
				list = (BasicDBList) obj.get("Dates");			
				String[] arrayParsedDates =parseMongoArray(list);

				issue = new Issues(arrayParsedDates, project, arrayParsedComments, "comments");

				issueList.add(issue);
			}
			
		} catch(MongoException e){
			System.out.println(e);
		}
		

		return issueList;	
	}
}
