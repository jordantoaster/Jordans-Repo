package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import org.junit.Test;

import com.myawesomeapp.utility.UserAccessValidator;

public class UtilityAccessValidatorUnitTest {

	UserAccessValidator validate = new UserAccessValidator();
	String username = "jordan";
	String password = "J0rdan1!?£";
	String confirm = "J0rdan1!?£";
	String wrongPassword = "foobar";
	String wrongUsername = "a";
	
	@Test
	public void testValidateLogin(){
		assertEquals(true, validate.validateLoginDetails(username, password));
		assertEquals(false, validate.validateLoginDetails(username, wrongPassword));
		assertEquals(false, validate.validateLoginDetails(wrongUsername, wrongPassword));
	}
	
	@Test
	public void testValidateRegister(){
		assertEquals(true, validate.validateRegDetails(username, password, confirm));
		assertEquals(false, validate.validateRegDetails(username, password, username));
		assertEquals(false, validate.validateRegDetails(wrongUsername, password, confirm));
	}
}
