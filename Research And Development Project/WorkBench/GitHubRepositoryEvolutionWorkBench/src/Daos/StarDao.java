package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;

import Models.Commits;
import Models.Stars;

public class StarDao {
	public boolean insertStars(Stars stars){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Stars");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", stars.getDates());
			documentDetail.put("Stars", stars.getStars());
			documentDetail.put("Project", stars.getProject());

		
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
}
