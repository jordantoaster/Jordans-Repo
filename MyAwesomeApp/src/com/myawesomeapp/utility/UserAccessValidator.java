package com.myawesomeapp.utility;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/*Class that validates a user details*/
public class UserAccessValidator {
	public boolean validateDetails(String username, String password){
		
		if(username.length() < 5 || password.length() < 5){
			return false;
		}

        boolean passwordValid = applyRegex(password);
        
        if(!passwordValid){
        	return false;
        }
		
		return true;
	}

	/*^               # start-of-string
	(?=.*[0-9])       # a digit must occur at least once
	(?=.*[a-z])       # a lower case letter must occur at least once
	(?=.*[A-Z])       # an upper case letter must occur at least once
	(?=.*[@#$%^&+=])  # a special character must occur at least once
	$                 # end-of-string*/
	private boolean applyRegex(String password) {
        String patternString = "((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!]).{8,40})";
        boolean matches = password.matches(patternString);
        
        return matches;
	}
}
