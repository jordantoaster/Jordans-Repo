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
	public boolean insertIssues(Issues issue){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Issues");
		
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
	
	public boolean insertIssuesClosedAt(Issues issue){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("IssuesClosedAt");
		
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
	
	public boolean insertIssuesComments(Issues issue){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("IssueComments");
		
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
	
	public ArrayList<Issues> getIssues(){
		
	    ArrayList<Issues> issueList = new ArrayList<Issues>();
		
	    try {
			DBCollection collection = new dbConnectionBuilder().getMongoCollection("Issues");
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
	
	public String[] parseMongoArray(BasicDBList list){
		list.toArray();
		String[] arrayParsed = new String[list.size()];
		arrayParsed = list.toArray(arrayParsed);
		return arrayParsed;
	}
}
