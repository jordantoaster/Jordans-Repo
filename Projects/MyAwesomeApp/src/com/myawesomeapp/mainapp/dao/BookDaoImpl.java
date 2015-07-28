package com.myawesomeapp.mainapp.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.gson.Gson;
import com.myawesomeapp.mainapp.pojo.Book;
import com.myawesomeapp.utility.DatabaseConnectionHelper;
import com.myawesomeapp.utility.ResultSetToJson;

public class BookDaoImpl implements BookDaoInterface{
	
	DatabaseConnectionHelper helper = new DatabaseConnectionHelper();
	Connection conn = helper.init();
	
	public String getAllUserBooks(String uid) {
				
		try {	
			
			//get 4 random
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT BookName, BookImage, BookId, Username, BookPrice, ForSale FROM books WHERE Username = "
					+ "'"+uid+"'");
						
			ResultSetToJson convertRs = new ResultSetToJson();
			
			String response = convertRs.convertResultSetBook(rs);
				
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return "";
	}

	@Override
	public boolean changeBookSaleStatus(String bookId, String status) {
				
		try {	
			
			Statement stmt = conn.createStatement();
			stmt.executeUpdate("UPDATE books " + "SET ForSale = '"+status+"' WHERE BookId = '"+bookId+"' ");
				
 			return true;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return false;
	}

	//TODO
	public boolean purchaseBook(String bookId, String bookStatus, String newOwner, String oldOwner) {
		
		UserDaoImpl dao = new UserDaoImpl();
		Gson gson = new Gson();
				
		//check new owner has enough money
		boolean adequateFunds = dao.compareUserFundsWithBookPrice(newOwner, bookId);
		
		if(adequateFunds){
						
			//change owner
			boolean ownerChange = updateOwner(newOwner, bookId);
						
			if(ownerChange){
				
				//update Funds
				Book[] book = gson.fromJson(getBookDetails(bookId), Book[].class);
				dao.updateBalance(book[0].getBookPrice(), newOwner, false);
								
				//update old owner funds
				dao.updateBalance(book[0].getBookPrice(), oldOwner, true);
				
				return true;
			}
		}
		
		return false;
	}

	public String getAllBooksForSale(String uid) {
				
		try {	
			
			//get 4 random
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT BookName, BookImage, BookId, Username, BookPrice, ForSale FROM books WHERE Username != "
					+ "'"+uid+"'");
						
			ResultSetToJson convertRs = new ResultSetToJson();
			
			String response = convertRs.convertResultSetBook(rs);
				
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		

		return "";
	}

	@Override
	public String getBookDetails(String bookId) {
		
		try {	
			
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT BookId, BookName, BookImage, BookPrice, Username, ForSale FROM books WHERE BookId = "
					+ "'"+bookId+"'");
			
			ResultSetToJson convertRs = new ResultSetToJson();
			String response = convertRs.convertResultSetBook(rs);
				
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return "no details found";
	}

	public boolean updateOwner(String uid, String bookId) {
				
		try {	
			
			Statement statement = conn.createStatement();			
			statement.executeUpdate("UPDATE books " + "SET Username = '"+uid+"' WHERE BookId = '"+bookId+"' ");
			statement.executeUpdate("UPDATE books " + "SET ForSale = 'false' WHERE BookId = '"+bookId+"' ");
						
 			return true;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return false;
	}

	@Override
	public String getSearchResults(String searchString) {
		
		try {	
			
			//get 4 random
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT BookName, BookImage, BookId, Username, BookPrice, ForSale FROM books WHERE BookName LIKE "
					+ "'%"+searchString+"%'");
						
			ResultSetToJson convertRs = new ResultSetToJson();
			
			String response = convertRs.convertResultSetBook(rs);
			
			System.out.println(response);
 			
			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}

		return "";
	}

	//Currently only used for unit test purposes
	public boolean insertBook(String id, String bookName, String bookImage,
			int bookPrice, String username, String forSale) {

		try {			
			Statement statement = conn.createStatement();			
			statement.executeUpdate("INSERT INTO books " + "VALUES ('"+id+"','"+bookName+"','"+bookImage+"','"+bookPrice+"','"+username+"','"+forSale+"')");

			return true;
	
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return false;
	}

	//only used for unit test purposes currently
	public boolean deleteBook(String uid) {
		
		try {				
			Statement statement = conn.createStatement();		
			statement.executeUpdate("DELETE FROM books " + "WHERE BookName = '"+uid+"' ");

			return true;				
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
			return false;
		}

	}
}
