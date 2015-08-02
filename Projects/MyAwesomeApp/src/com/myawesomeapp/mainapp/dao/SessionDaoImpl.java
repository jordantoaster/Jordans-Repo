package com.myawesomeapp.mainapp.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.myawesomeapp.utility.Action;
import com.myawesomeapp.utility.DatabaseConnectionHelper;

public class SessionDaoImpl implements SessionDaoInterface {
	
	DatabaseConnectionHelper helper = new DatabaseConnectionHelper();
	Connection conn = helper.init();

	public boolean tryInsertSession(Action action) {

		try {	
			
			Statement statement = conn.createStatement();			
			statement.executeUpdate("INSERT INTO activity " + "VALUES (null,'"+action.getMessage()+"',"
			+ "'"+action.getUsername()+ "','"+action.getTime()+"','"+action.getIp()+"')");
				
 			return true;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return false;
	}

}
