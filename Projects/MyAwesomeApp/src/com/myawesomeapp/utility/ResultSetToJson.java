package com.myawesomeapp.utility;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.myawesomeapp.servlets.PopulateProfilePojo;

public class ResultSetToJson {
	
	//very hard codey, make more flexible for any result set
	public String convertResultSet(ResultSet rs) throws SQLException{
		
		Gson gson = new Gson();
		
		if(rs.next()){
		    PopulateProfilePojo pojo = new PopulateProfilePojo(rs.getString("Username"), rs.getString("Password"), rs.getString("Balance"));		
		 	String jsonResponse = gson.toJson(pojo);
		 	
		 	return jsonResponse;
		}
		
		return "";
	}

}
