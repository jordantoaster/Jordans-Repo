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
import com.mongodb.MongoException;

import Models.User;
import Utility.ResponseBase;

public class UserDao {
		
	public boolean findUser(User user){
						
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Users");
		
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
	
	public String createUser(User user){
		
		Gson gson = new Gson();
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Users");
		
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
}
