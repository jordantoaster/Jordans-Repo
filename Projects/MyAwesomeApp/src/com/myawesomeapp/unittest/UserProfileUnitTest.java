package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.junit.*;

import com.myawesomeapp.mainapp.dao.UserDaoImpl;
import com.myawesomeapp.mainapp.pojo.User;
import com.myawesomeapp.utility.ResultSetToJson;

public class UserProfileUnitTest {
	
	static Connection conn;
	String uidTrue = "jordan12";
	String uidFalse = "kolo";
	UserDaoImpl impl = new UserDaoImpl();
	Statement stmt;
	ResultSet rs;
	ResultSetToJson rsj;
	String uid = "jordannn";
	String password = "jordan2";
	String oldUid = "jord";
	User user = new User("jord", "jordan1");
	User userTwo = new User("bill", "jordan1");
	
	
	@Test
	public void testGetUserDetails(){
		assertEquals("", impl.getUserDetails(uidFalse));
		assertNotEquals("", impl.getUserDetails(uidTrue));
	}
	
	//think about best way to test resultset to json converter
	
	@Test
	public void updateBalance(){
		assertEquals(true, impl.updateBalance("10", "jordannn"));
	}
	
	//delete after test
	@Test
	public void updateUserDetails(){
		
		impl.insertUser(user);
		assertEquals(true, impl.updateUserDetails(uid, password, oldUid));
		impl.insertUser(userTwo);
		assertEquals(false, impl.updateUserDetails("bill", password, uid));
		
	}
	

}
