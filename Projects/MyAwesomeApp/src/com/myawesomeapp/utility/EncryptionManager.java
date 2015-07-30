package com.myawesomeapp.utility;

import org.jasypt.util.password.StrongPasswordEncryptor;
/*
 * In this program I use jaspyt only for instances that require an encrypted password to be evaluated -
 * during login and during the encrpytion process
 * otherwise the plain password is used for comparison with the build in library functions
 * refer to login servlet to see when both are used in tandem
 * possible refactor to make that code clearer
 * */
public class EncryptionManager {
	
    StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();
	
	//Library stores the salt inside the has itself, salt is random and changes hash each time
	public String encrypt(String plainText){
		
		String encryptedPassword = passwordEncryptor.encryptPassword(plainText);

		return encryptedPassword;
	}
	
	//checks the user has entered a correct password
	public boolean checkPassword(String submittedPassword, String storedPassword){	
	    return passwordEncryptor.checkPassword(submittedPassword, storedPassword);	
	}	
}
