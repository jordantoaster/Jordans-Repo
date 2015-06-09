package com.myawesomeapp.utility;

/*Class that validates a user details*/
public class UserAccessValidator {
	public boolean validateDetails(String username, String password){
		
		if(username.length() < 5 || password.length() < 5){
			return false;
		}
		
		return true;
	}
}
