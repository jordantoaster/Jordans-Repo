package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;
import Models.Forks;

public class ForkDao {
	public boolean insertStars(Forks fork){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Forks");
		
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
}
