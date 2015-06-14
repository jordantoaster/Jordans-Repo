package com.myawesomeapp.servlets;

/*Defines methods required by Dao*/
public interface UserDaoInterface {
	boolean insertUser(User user);
	boolean readAndCompare(User user);
	boolean updateBalance(String amount, String uid);
}
