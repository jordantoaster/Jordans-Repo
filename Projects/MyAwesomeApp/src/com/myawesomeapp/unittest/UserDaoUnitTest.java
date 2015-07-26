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
	public void insertUserDetails(){	
		assertEquals(true, impl.insertUser(uid, password, url));
		
		//remove test data
		impl.deleteUser(uid, password);
	}

}
