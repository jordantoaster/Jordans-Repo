package com.myawesomeapp.unittest;

import static org.junit.Assert.assertEquals;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.junit.BeforeClass;
import org.junit.Test;
import com.myawesomeapp.mainapp.pojo.User;
import com.myawesomeapp.mainapp.dao.UserDaoImpl;
import com.myawesomeapp.utility.UserAccessValidator;

public class LoginUnitServerTest {
	
	//static Connection conn = null;
	static User userTrue;
	static User userFalse;
	
	@Test
	public void testUserAccessValidation(){
		
		UserAccessValidator validator = new UserAccessValidator();
		
	    assertEquals(false, validator.validateLoginDetails("", ""));
	    assertEquals(false, validator.validateLoginDetails("Bilbo", "Baggins"));
	    assertEquals(false, validator.validateLoginDetails("b", "b"));
	    assertEquals(false, validator.validateLoginDetails("bilbo", "Ba11e"));
	    assertEquals(false, validator.validateLoginDetails("bilbo", "Baggins!#!"));

	}
		
	@Test
	public void testLoginProcess(){
		/*delete user after entry*/
		
		userTrue = new User("20000","bilbo!B##£","0");
		userFalse = new User("saruman", "jena", "0");
		
		UserDaoImpl dao = new UserDaoImpl();
		
		dao.insertUser(userTrue);
		
		assertEquals(true, dao.readAndCompare(userTrue.getUsername(), userTrue.getPassword()));
		assertEquals(false, dao.readAndCompare(userFalse.getUsername(), userFalse.getPassword()));
		
		dao.deleteUser(userTrue.getUsername(), userTrue.getPassword());
	}
}
