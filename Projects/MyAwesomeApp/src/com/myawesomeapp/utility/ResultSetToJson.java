package com.myawesomeapp.utility;

import java.sql.ResultSet;
import java.sql.SQLException;
import com.google.gson.Gson;
import com.myawesomeapp.utility.PopulateProfilePojo;

public class ResultSetToJson {
	
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
