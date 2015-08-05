package com.myawesomeapp.mainapp.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.gson.Gson;
import com.myawesomeapp.mainapp.pojo.Book;
import com.myawesomeapp.mainapp.pojo.User;
import com.myawesomeapp.utility.DatabaseConnectionHelper;
import com.myawesomeapp.utility.EncryptionManager;
import com.myawesomeapp.utility.ResultSetToJson;

public class UserDaoImpl implements UserDaoInterface {
	
	DatabaseConnectionHelper helper = new DatabaseConnectionHelper();
	Connection conn = helper.init();
	Statement stmt;
	ResultSet rs;

	/*Takes a user object and inserts into the database*/
	public boolean insertUser(String username, String password, String url, String encodedUsername) {
		
		//we are inserting
		boolean isOnSystem = checkNewUserNotOnSystem(username);
		
		if(isOnSystem){
			try {			
				Statement statement = conn.createStatement();			
				statement.executeUpdate("INSERT INTO user " + "VALUES ('"+username+"','"+password+"','"+50+"','"+url+"','"+encodedUsername+"')");
						
				return true;
		
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("connection failed " + e);
			}
		}
		
		System.out.println("done");

		return false;
	}
	
	
	private boolean checkNewUserNotOnSystem(String username) {
		try {
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT * FROM user WHERE Username = "
					+ "'"+username+"'");
			
			//details found regarding the uid passed in
			if(rs.next()){			
				return false;
			} 						
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return true;
	}


	public boolean readAndCompare(String uid, String pass){				
		EncryptionManager manager = new EncryptionManager();	
		try {
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT * FROM user WHERE Username = "
					+ "'"+uid+"'");
			
			//details found regarding the uid passed in
			if(rs.next()){			
				//now evaluate the password for log in attempt
				String storedPassword = rs.getString("password");
			
				boolean isOnSystem = manager.checkPassword(pass, storedPassword);
			
				//password matches that in db
				if(isOnSystem){
					return true;
				} 
			} 						
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return false;
	}

	//Takes the uid and an amount to add to the balance column
	public boolean updateBalance(String amount, String uid, boolean isAddition) {  
						
		try {	
			if(isAddition){
				Statement statement = conn.createStatement();			
				statement.executeUpdate("UPDATE user " + "SET Balance = Balance + '"+amount+"' WHERE Username = '"+uid+"' ");
			} else {
				Statement statement = conn.createStatement();			
				statement.executeUpdate("UPDATE user " + "SET Balance = Balance - '"+amount+"' WHERE Username = '"+uid+"' ");
			}
		
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
				
		try {	
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT Username, Password, Balance, ProfilePic FROM user WHERE Username = "
					+ "'"+uid+"'");
			
			ResultSetToJson convertRs = new ResultSetToJson();
			String response = convertRs.convertResultSetUser(rs);
				
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return "";
	}

	@Override
	public boolean updateUserDetails(String uid, String pass, String oldUid) {
		
		boolean isNewUidAlreadyOnSystem = readAndCompare(uid, pass);

		if(!isNewUidAlreadyOnSystem){
		try {			
				Statement statement = conn.createStatement();			
				statement.executeUpdate("UPDATE user " + "SET Password = '"+pass+"' WHERE Username = '"+oldUid+"' ");
				statement.executeUpdate("UPDATE user " + "SET Username = '"+uid+"' WHERE Username = '"+oldUid+"' ");		
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
		
			try {	
				
				Statement statement = conn.createStatement();		
				statement.executeUpdate("DELETE FROM user " + "WHERE Username = '"+uid+"' ");
								
				return true;
					
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("connection failed " + e);
				return false;
			}
				
	}


	public boolean compareUserFundsWithBookPrice(String uid, String bookId) {
				
		Gson gson = new Gson();
		BookDaoImpl dao = new BookDaoImpl();
		
		//get user details
		String userDetails = getUserDetails(uid);
		
		//convert to pojo
		User user = gson.fromJson(userDetails, User.class);

		//get book price
		String bookDetails = dao.getBookDetails(bookId);
		
		//convert to book pojo, its an array but only has one row...REFACTOR required
		Book[] book = gson.fromJson(bookDetails, Book[].class);
				
		//parse to int
		int bookPrice = Integer.parseInt(book[0].getBookPrice());
	    int userBalance = Integer.parseInt(user.getBalance());
		    
	    System.out.println(bookPrice + "   " + userBalance);
	    
		//compare with balance (why do i need to convert from string to int?
		if(userBalance >= bookPrice){
			return true;
		}
		
		return false;
	}


	@Override
	public String getDecodedUsername(String encodedUsername) {
		try {	
			String result = "";
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT Username FROM user WHERE EncodedUsername = "
					+ "'"+encodedUsername+"'");
			
			if(rs.next()){
				result = rs.getString("Username");
			}
				
 			return result;		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		return null;
	}


	public String getEncodedUsername(String username) {
		try {	
			String result = "";
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT EncodedUsername FROM user WHERE Username = "
					+ "'"+username+"'");
			
			if(rs.next()){
				result = rs.getString("EncodedUsername");
			}
				
 			return result;		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		return null;
	}

}
