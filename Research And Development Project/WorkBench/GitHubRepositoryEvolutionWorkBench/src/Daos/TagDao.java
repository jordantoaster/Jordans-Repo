package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;
import Models.Stars;
import Models.Tags;

public class TagDao {
	public boolean insertStars(Tags tag){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Tags");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", tag.getDates());
			documentDetail.put("Stars", tag.getTags());
			documentDetail.put("Project", tag.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
}
