/**
 * @author Jordan McDonald
 *
 * Description - reusuable utility class which connects to the Mongo database
 */

package Daos;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class dbConnectionBuilder {
	
	@SuppressWarnings("deprecation")
	public DBCollection getMongoCollection(String database, String collection){
		
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB(database);
		DBCollection col = db.getCollection(collection);
		
		return col;
	}
	
}
