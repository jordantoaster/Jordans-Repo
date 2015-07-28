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
import com.myawesomeapp.utility.EncryptionManager;
import com.myawesomeapp.utility.ResultSetToJson;

public class UserDaoUnitTest {
	
	static Connection conn;
	String uidTrue = "jordan12";
	String uidFalse = "kolo";
	UserDaoImpl impl = new UserDaoImpl();
	ResultSet rs;
	ResultSetToJson rsj;
	String uid = "testUser";
	String password = "password";
	String url = "/url/";
	EncryptionManager manager = new EncryptionManager();
	
	@Test
	public void testInsertUserDetails(){	
		assertEquals(true, impl.insertUser(uid, password, url));
		
		//remove test data
		impl.deleteUser(uid, password);
	}
	
	@Test
	public void testReadAndCompare(){

		//add new test for correct data when refactored
		
		assertEquals(false, impl.readAndCompare("","",false));		
	}
	
	@Test
	public void testUpdateBalance(){
        impl.insertUser(uid, password, url);	
		impl.updateBalance("20", uid, true);
		impl.updateBalance("20", uid, false);
		impl.deleteUser(uid, password);
	}
	
	@Test
	public void testGetUserDetails(){
        impl.insertUser(uid, password, url);	
		assertEquals("", impl.getUserDetails(""));	
		assertNotEquals("", impl.getUserDetails(uid));		
		impl.deleteUser(uid, password);
	}
	
	@Test
	public void testUpdateUserDetails(){
        impl.insertUser(uid, password, url);	
		assertEquals(true, impl.updateUserDetails("newtestUser", password, uid));	
		impl.deleteUser("newtestUser", password);
	}

}
