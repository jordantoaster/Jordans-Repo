/**
 * @author Jordan McDonald
 *
 * Description - handles the required fork/DAO functionality - in this case an insert
 */

package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;
import Models.Forks;

public class ForkDao {
	public boolean insertStars(Forks fork, String database){
		
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
}
