/**
 * @author Jordan McDonald
 *
 * Description - main role is to insert users to the DB - get users from the DB
 */

package Daos;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoException;

import Models.Commits;
import Models.User;
import Utility.ResponseBase;

public class UserDao {
		
	public boolean findUser(User user, String database){
						
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Users");
		
			BasicDBObject searchQuery = new BasicDBObject();
			searchQuery.put("username", user.username);
			searchQuery.put("password", user.password);
			searchQuery.put("role", user.role);
			DBCursor cursor = userCollection.find(searchQuery);
		
			while (cursor.hasNext()) {
				return true;
			}
		} catch(MongoException e){
			System.out.println(e);
		}
		return false;
	}
	
	public String createUser(User user, String database){
		
		Gson gson = new Gson();
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection(database, "Users");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("username", user.username);
			documentDetail.put("password", user.password);
			documentDetail.put("role", user.role);
		
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return gson.toJson(new ResponseBase("false","Database error has occured", "register"));
		}
		
		return gson.toJson(new ResponseBase("true","Successful Registration, please log in", "register"));	
	}
	
	public boolean deleteUser(User user, String database){
		DBCollection collection = new dbConnectionBuilder().getMongoCollection(database, "Users");
		
		BasicDBObject query = new BasicDBObject();
		query.append("username", user.getName());
				
		DBCursor cursor = collection.find(query);
		while (cursor.hasNext()) {
			DBObject item = cursor.next();
			collection.remove(item);
		}
		
		return true;
	}
}
