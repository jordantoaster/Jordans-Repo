package Daos;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class dbConnectionBuilder {
	
	@SuppressWarnings("deprecation")
	public DBCollection getMongoCollection(String collection){
		
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB("GithubEvolution");
		DBCollection col = db.getCollection(collection);
		
		return col;
	}
	
}
