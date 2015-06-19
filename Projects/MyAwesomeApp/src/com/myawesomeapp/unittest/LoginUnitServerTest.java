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
		
	    assertEquals(false, validator.validateDetails("", ""));
	    assertEquals(false, validator.validateDetails("Bilbo", "Baggins"));
	    assertEquals(false, validator.validateDetails("b", "b"));
	    assertEquals(false, validator.validateDetails("bilbo", "Ba11e"));
	    assertEquals(false, validator.validateDetails("bilbo", "Baggins!#!"));

	}
		
	@Test
	public void TestDatabase(){
		/*delete user after entry*/
		
		userTrue = new User("bilbo000","bilbo!B##£");
		userFalse = new User("saruman", "jena");
		
		UserDaoImpl dao = new UserDaoImpl();
		
		dao.insertUser(userTrue);
		
		assertEquals(true, dao.readAndCompare(userTrue));
		assertEquals(false, dao.readAndCompare(userFalse));
	}
}
