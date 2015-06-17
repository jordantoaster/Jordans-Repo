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
	String uidTrue = "jordan1";
	String uidFalse = "kolo";
	UserDaoImpl impl = new UserDaoImpl();
	Statement stmt;
	ResultSet rs;
	ResultSetToJson rsj;
	
	@BeforeClass
	public static void setupConnection(){
		
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
	
	@Test
	public void testGetUserDetails(){
		assertEquals("", impl.getUserDetails(uidFalse));
		assertNotEquals("", impl.getUserDetails(uidTrue));
	}
	
	@Test
	public void testResultSetToJson() throws SQLException{
		
	    stmt = conn.createStatement();
		rs = stmt.executeQuery("SELECT Username, Password, Balance FROM user WHERE Username = "
				+ "'"+uidFalse+"'");
		
		rsj = new ResultSetToJson();
		
		assertEquals("", rsj.convertResultSet(rs));
		
		rs = stmt.executeQuery("SELECT Username, Password, Balance FROM user WHERE Username = "
				+ "'"+uidTrue+"'");
		
		rsj = new ResultSetToJson();
		
		assertNotEquals("", rsj.convertResultSet(rs));

	}
	

}
