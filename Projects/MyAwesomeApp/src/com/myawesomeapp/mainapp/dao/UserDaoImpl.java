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
	public boolean insertUser(String username, String password, String url) {
		
		//we are inserting
		boolean isOnSystem = readAndCompare(username, password, true);
		
		if(!isOnSystem){
			try {			
				Statement statement = conn.createStatement();			
				statement.executeUpdate("INSERT INTO user " + "VALUES ('"+username+"','"+password+"','"+0+"','"+url+"')");
						
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
	//REFACTOR, VERY MESSY, GET DELETE TO USE THIS WHEN FIXED, MOVE LOGIN CHECKS OUT
	public boolean readAndCompare(String uid, String pass, boolean isInsert) {
				
		EncryptionManager manager = new EncryptionManager();
				
		try {
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT * FROM user WHERE Username = "
					+ "'"+uid+"'");
			
			//details already on system during in insert attempt so blocked
			if(rs.next() && isInsert){			
				return false;
			} 
			
			// Move cursor to the first row
		    rs.beforeFirst();
		    
			if (isInsert && !rs.next()) { //if inserting and no read result then allow insert
				return false;
			} 
			
		    rs.beforeFirst();

			if (rs.next()){ //checks for member details on system / log in handling
				
				//now evaluate the password for log in attempt
				String storedPassword = rs.getString("password");
			
				boolean isOnSystem = manager.checkPassword(pass, storedPassword);
			
				if(isOnSystem){
					return true;
				} 
			}
			
			//log in failed, details not on system or password failed
			return false;
			
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
		
		return null;
	}

	@Override
	public boolean updateUserDetails(String uid, String pass, String oldUid) {
		
		boolean isNewUidAlreadyOnSystem = readAndCompare(uid, pass, false);

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
		
		//compare with balance (why do i need to convert from string to int?
		if(userBalance >= bookPrice){
			return true;
		}
		
		return false;
	}

}
