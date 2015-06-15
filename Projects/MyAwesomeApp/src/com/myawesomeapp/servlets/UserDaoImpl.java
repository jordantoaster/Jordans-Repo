package com.myawesomeapp.servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.myawesomeapp.utility.ResultSetToJson;

public class UserDaoImpl implements UserDaoInterface {
	
	/*Sets up the Mysql connection and access rights*/
	public Connection init(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("driver found");
		} catch (ClassNotFoundException e) {
			System.out.println("driver not found " + e);
		}
		
		String url = "jdbc:mysql://127.0.0.1:3306/webappdb?user=root";
		String username = "root";
		String password = "jordan321";
		
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url,username,password);
			System.out.println("connected");
		}  catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return conn;
	}

	/*Takes a user object and inserts into the database*/
	public boolean insertUser(User user) {
		
		Connection conn = init();
		
		//TODO - check username is not taken - return bool
			
		try {			
			Statement statement = conn.createStatement();			
			statement.executeUpdate("INSERT INTO user " + "VALUES ('"+user.getUsername()+"','"+user.getPassword()+"')");
			
			conn.close();
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		System.out.println("done");

		return false;
	}

	/*Determines if the details provided are members in the system*/
	public boolean readAndCompare(User user) {
		
		Connection conn = init();
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM user WHERE Username = "
					+ "'"+user.getUsername()+"'AND Password = '"+user.getPassword()+"'");
			
			if(rs.next()) {
				//String username = rs.getString("Username");
				//String password = rs.getString("Password");
				//System.out.println(username + "\n" + password);
				
				conn.close();
				return true;
			} else {
				conn.close();
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	public boolean updateBalance(String amount, String uid) {  
		Connection conn = init();
		
		try {			
			Statement statement = conn.createStatement();			
			statement.executeUpdate("UPDATE user " + "SET Balance = Balance + '"+amount+"' WHERE Username = '"+uid+"' ");
			
			conn.close();
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
			return false;
		}
		
		System.out.println("done");
		return true;
	}

	public String getUserDetails(String uid) {
		
		Connection conn = init();
		
		try {	
			
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT Username, Password, Balance FROM user WHERE Username = "
					+ "'"+uid+"'");
			
			ResultSetToJson convertRs = new ResultSetToJson();
			String response = convertRs.convertResultSet(rs);
	
			conn.close();
			
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return null;
	}

}
