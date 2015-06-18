package com.myawesomeapp.mainapp.dao;

import com.myawesomeapp.mainapp.pojo.User;

/*Defines methods required by Dao*/
public interface UserDaoInterface {
	boolean insertUser(User user);
	boolean readAndCompare(User user);
	boolean updateBalance(String amount, String uid);
	String getUserDetails(String uid);
	boolean updateUserDetails(String uid, String pass, String oldUid);
}
