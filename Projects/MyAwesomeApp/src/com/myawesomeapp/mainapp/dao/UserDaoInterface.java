package com.myawesomeapp.mainapp.dao;

/*Defines methods required by Dao*/
public interface UserDaoInterface {
	boolean insertUser(String username, String password, String url, String encodedUsername);
	boolean readAndCompare(String uid, String pass);
	boolean updateBalance(String amount, String uid, boolean isAddition);
	String getUserDetails(String uid);
	boolean updateUserDetails(String uid, String pass, String oldUid);
	boolean deleteUser(String uid, String pass);
	boolean compareUserFundsWithBookPrice(String uid, String bookId);
	String getDecodedUsername(String encodedUsername);
}
