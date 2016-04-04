/**
 * @author Jordan McDonald
 *
 * Description - coordinates the tag models and the mongo database - only includes operations that are required
 */

package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;
import Models.Stars;
import Models.Tags;

public class TagDao {
	
	//performs an insert
	public boolean insertStars(Tags tag, String database){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Tags");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Dates", tag.getDates());
			documentDetail.put("Tags", tag.getTags());
			documentDetail.put("Project", tag.getProject());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
}
