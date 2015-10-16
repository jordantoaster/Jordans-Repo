package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoException;

import Models.User;

public class UserDao {
	
	public String findUser(User user){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Users");
		
			BasicDBObject searchQuery = new BasicDBObject();
			searchQuery.put("username", user.username);
			searchQuery.put("password", user.password);
			searchQuery.put("role", user.role);
			DBCursor cursor = userCollection.find(searchQuery);
		
			while (cursor.hasNext()) {
				return "true";
			}
		} catch(MongoException e){
			System.out.println(e);
		}
		
		return "false";
	}
	
	public String createUser(User user){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Users");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("username", user.username);
			documentDetail.put("password", user.password);
			documentDetail.put("role", user.role);
		
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return "false";
		}
		
		return "true";		
	}
}
