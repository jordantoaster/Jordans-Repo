package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;

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
}
