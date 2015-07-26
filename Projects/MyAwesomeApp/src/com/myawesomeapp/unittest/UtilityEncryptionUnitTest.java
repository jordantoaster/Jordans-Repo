package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import org.junit.Test;

import com.myawesomeapp.utility.EncryptionManager;

public class UtilityEncryptionUnitTest {

	EncryptionManager manager = new EncryptionManager();
	String EncryptedPassword = manager.encrypt("password");
	
	@Test
	public void testEncrypt(){
		assertNotNull(manager.encrypt("text"));
	}
	
	@Test 
	public void testCheck(){
		assertEquals(true, manager.checkPassword("password", EncryptedPassword));
		assertEquals(false, manager.checkPassword("passwor", EncryptedPassword));
	}
}
