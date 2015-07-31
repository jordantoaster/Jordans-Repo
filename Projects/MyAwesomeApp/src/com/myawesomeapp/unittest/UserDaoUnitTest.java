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
	String encodedUsername = "453445345";
	
	@Before
	public void setup(){
		impl.insertUser(uid, password, url, encodedUsername);
	}
	
	@After
	public void teardown(){
		impl.deleteUser(uid, password);
		impl.deleteUser("newtestUser", password);
	}
	
	@Test
	public void testInsertUserDetails(){
		impl.deleteUser(uid, password);
		assertEquals(true, impl.insertUser(uid, password, url, encodedUsername));
	}
	
	@Test
	public void testReadAndCompare(){		
		assertEquals(false, impl.readAndCompare("",""));		
	}
	
	@Test
	public void testUpdateBalance(){
		impl.updateBalance("20", uid, true);
		impl.updateBalance("20", uid, false);
	}
	
	@Test
	public void testGetUserDetails(){
		assertEquals("", impl.getUserDetails(""));	
		assertNotEquals("", impl.getUserDetails(uid));		
	}
	
	@Test
	public void testUpdateUserDetails(){
        impl.insertUser(uid, password, url, uid);	
		assertEquals(true, impl.updateUserDetails("newtestUser", password, uid));	
	}

}
