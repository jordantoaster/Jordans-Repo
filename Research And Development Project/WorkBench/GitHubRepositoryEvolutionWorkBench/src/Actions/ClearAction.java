/**
 * @author Jordan McDonald
 *
 * Description - activate a java run time instance to perform command line action - in this case wiping the MongoDB database
 */

package Actions;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class ClearAction implements Action{

	boolean stop = true;
	
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		MongoClient mongoClient = new MongoClient();
		DB db = mongoClient.getDB("Backup");
		
		DBCollection myCollection = db.getCollection("Forks");
		myCollection.drop();
		
		myCollection = db.getCollection("Commits");
		myCollection.drop();
		
		myCollection = db.getCollection("Stars");
		myCollection.drop();
		
		myCollection = db.getCollection("Contributions");
		myCollection.drop();
		
		myCollection = db.getCollection("Users");
		myCollection.drop();
		
		myCollection = db.getCollection("Issues");
		myCollection.drop();
		
		myCollection = db.getCollection("IssuesComments");
		myCollection.drop();
		
		myCollection = db.getCollection("Mean");
		myCollection.drop();
		
		//add rest as required
		
		return "true";
	}

}
