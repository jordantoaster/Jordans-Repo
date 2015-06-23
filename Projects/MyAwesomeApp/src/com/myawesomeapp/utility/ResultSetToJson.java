package com.myawesomeapp.utility;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.myawesomeapp.mainapp.pojo.Book;
import com.myawesomeapp.utility.PopulateProfilePojoNeedRefactor;

public class ResultSetToJson {
	
	Gson gson = new Gson();

	//extend when required to take another identifying parameter, ie differing actions for each conversion
	public String convertResultSetUser(ResultSet rs) throws SQLException{
				
		if(rs.next()){
		    PopulateProfilePojoNeedRefactor pojo = new PopulateProfilePojoNeedRefactor(rs.getString("Username"), rs.getString("Password"), rs.getString("Balance"));		
		 	String jsonResponse = gson.toJson(pojo);
		 	
		 	return jsonResponse;
		}
		
		return "";
	}
	
	public String convertResultSetBook(ResultSet rs) throws SQLException{
		
		ArrayList<Book> list = new ArrayList<Book>();

		while(rs.next()){
		    Book pojo = new Book(rs.getString("BookName"), rs.getString("BookImage"), rs.getString("BookPrice"), rs.getString("BookId"));		

		    list.add(pojo);
		}
		
		String json = new Gson().toJson(list);
		return json;
	}

}
