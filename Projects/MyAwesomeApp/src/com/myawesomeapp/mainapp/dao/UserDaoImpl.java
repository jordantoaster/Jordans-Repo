package com.myawesomeapp.mainapp.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.myawesomeapp.mainapp.pojo.Book;
import com.myawesomeapp.mainapp.pojo.User;
import com.myawesomeapp.utility.PopulateProfilePojoNeedRefactor;
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
		
		boolean isOnSystem = readAndCompare(user.getUsername(), user.getPassword());
		
		if(!isOnSystem){
			try {			
				Statement statement = conn.createStatement();			
				statement.executeUpdate("INSERT INTO user " + "VALUES ('"+user.getUsername()+"','"+user.getPassword()+"','"+0+"')");
							
				conn.close();
				
				return true;
		
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("connection failed " + e);
			}
		}
		
		System.out.println("done");

		return false;
	}

	/*Determines if the details provided are members in the system*/
	public boolean readAndCompare(String uid, String pass) {
		
		Connection conn = init();
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM user WHERE Username = "
					+ "'"+uid+"'AND Password = '"+pass+"'");
			
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

	//Takes the uid and an amount to add to the balance column
	public boolean updateBalance(String amount, String uid, boolean isAddition) {  
				
		Connection conn = init();
		
		try {	
			if(isAddition){
				Statement statement = conn.createStatement();			
				statement.executeUpdate("UPDATE user " + "SET Balance = Balance + '"+amount+"' WHERE Username = '"+uid+"' ");
			} else {
				Statement statement = conn.createStatement();			
				statement.executeUpdate("UPDATE user " + "SET Balance = Balance - '"+amount+"' WHERE Username = '"+uid+"' ");
			}
			conn.close();
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
			return false;
		}
		
		System.out.println("done");
		return true;
	}

	//Based on a uid retrieve the user details
	public String getUserDetails(String uid) {
		
		Connection conn = init();
		
		try {	
			
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT Username, Password, Balance FROM user WHERE Username = "
					+ "'"+uid+"'");
			
			ResultSetToJson convertRs = new ResultSetToJson();
			String response = convertRs.convertResultSetUser(rs);
	
			conn.close();
			
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return null;
	}

	@Override
	public boolean updateUserDetails(String uid, String pass, String oldUid) {
		Connection conn = init();
		
		boolean isNewUidAlreadyOnSystem = readAndCompare(uid, pass);

		if(!isNewUidAlreadyOnSystem){
		try {			
				Statement statement = conn.createStatement();			
				statement.executeUpdate("UPDATE user " + "SET Password = '"+pass+"' WHERE Username = '"+oldUid+"' ");
				statement.executeUpdate("UPDATE user " + "SET Username = '"+uid+"' WHERE Username = '"+oldUid+"' ");

				conn.close();
		
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("connection failed " + e);
				return false;
			}
		}
		System.out.println("done");
		return true;
	}

	@Override
	public boolean deleteUser(String uid, String pass) {
		
		Connection conn = init();
		
		//check user is in table
		boolean isInTable = readAndCompare(uid, pass);
		
		if(isInTable){
			try {	
				
				Statement statement = conn.createStatement();		
				statement.executeUpdate("DELETE FROM user " + "WHERE Username = '"+uid+"' ");
				
				conn.close();
				
				return true;
					
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("connection failed " + e);
				return false;
			}
		}		
		return false;
	}


	public boolean compareUserFundsWithBookPrice(String uid, String bookId) {
				
		Gson gson = new Gson();
		BookDaoImpl dao = new BookDaoImpl();
		
		//get user details
		String userDetails = getUserDetails(uid);
		
		//convert to pojo
		PopulateProfilePojoNeedRefactor user = gson.fromJson(userDetails, PopulateProfilePojoNeedRefactor.class);

		//get book price
		String bookDetails = dao.getBookDetails(bookId);
		
		//convert to book pojo, its an array but only has one row...REFACTOR required
		Book[] book = gson.fromJson(bookDetails, Book[].class);
				
		//parse to int
		int bookPrice = Integer.parseInt(book[0].getBookPrice());
	    int userBalance = Integer.parseInt(user.getBalance());
		
		//compare with balance (why do i need to convert from string to int?
		if(userBalance >= bookPrice){
			return true;
		}
		
		return false;
	}

}
