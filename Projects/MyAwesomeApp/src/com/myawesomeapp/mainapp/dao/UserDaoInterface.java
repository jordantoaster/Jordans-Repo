package com.myawesomeapp.mainapp.dao;

/*Defines methods required by Dao*/
public interface UserDaoInterface {
	boolean insertUser(String username, String password, String url);
	boolean readAndCompare(String uid, String pass, boolean isInsert);
	boolean updateBalance(String amount, String uid, boolean isAddition);
	String getUserDetails(String uid);
	boolean updateUserDetails(String uid, String pass, String oldUid);
	boolean deleteUser(String uid, String pass);
	boolean compareUserFundsWithBookPrice(String uid, String bookId);
}
