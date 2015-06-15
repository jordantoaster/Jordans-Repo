package com.myawesomeapp.servlets;

import java.sql.ResultSet;

import com.google.gson.JsonObject;

/*Defines methods required by Dao*/
public interface UserDaoInterface {
	boolean insertUser(User user);
	boolean readAndCompare(User user);
	boolean updateBalance(String amount, String uid);
	String getUserDetails(String uid);
}
