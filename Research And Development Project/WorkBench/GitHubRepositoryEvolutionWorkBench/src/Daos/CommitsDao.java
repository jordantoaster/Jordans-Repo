package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;
import Models.Commits;

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
	
}
