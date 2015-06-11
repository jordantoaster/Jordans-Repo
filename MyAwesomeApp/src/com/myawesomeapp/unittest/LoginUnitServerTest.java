package com.myawesomeapp.unittest;

import static org.junit.Assert.assertEquals;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.junit.BeforeClass;
import org.junit.Test;

import com.myawesomeapp.servlets.User;
import com.myawesomeapp.servlets.UserDaoImpl;
import com.myawesomeapp.utility.UserAccessValidator;

public class LoginUnitServerTest {
	
	static Connection conn = null;
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
	
	@BeforeClass
	public static void setupConnection(){
		
		userTrue = new User("bilbo","bilbo!B##£");
		userFalse = new User("saruman", "jena");
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("driver found");
		} catch (ClassNotFoundException e) {
			System.out.println("driver not found " + e);
		}
		
		String url = "jdbc:mysql://127.0.0.1:3306/webappdb?user=root";
		String username = "root";
		String password = "jordan321";
				
		try {
			conn = DriverManager.getConnection(url,username,password);
			System.out.println("connected");
		}  catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
	}
	
	//need to test for delete and updates
	@Test
	public void TestDatabase(){
		UserDaoImpl dao = new UserDaoImpl();
		
		dao.insertUser(userTrue);
		
		assertEquals(true, dao.readAndCompare(userTrue));
		assertEquals(false, dao.readAndCompare(userFalse));
	}
}
