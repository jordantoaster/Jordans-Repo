package assignment;

import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream.GetField;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;

public class ActivityLog {
	
	static PrintWriter printToFile;
	static StringBuilder logLine;
	
	public ActivityLog() throws IOException{
	    printToFile = new PrintWriter(new FileWriter("src/assignment/Log.txt", true));
	}

	public void storeSuccessfulLogin(String user, String password) throws UnknownHostException, SocketException {
		logLine = new StringBuilder();
		
		//thread safe version
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy h:mm:ss a");
		String formattedDate = sdf.format(date);
			
		logLine.append("*LOGIN SUCESSFUL* -" + "Username: " + user + " - ");
		logLine.append("Password: " + password + " - " + "IP: " + getIpAddress() + " - Date " + formattedDate);
		
		printToFile.println(logLine.toString());
		printToFile.close();
	}
	
	public void storeRegistration(String user, String password) throws UnknownHostException, SocketException {
		logLine = new StringBuilder();
		
		//thread safe version
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy h:mm:ss a");
		String formattedDate = sdf.format(date);
			
		logLine.append("*Registration SUCESSFUL* -" + "Username: " + user + " - ");
		logLine.append("Password: " + password + " - " + "IP: " + getIpAddress() + " - Date " + formattedDate);
		
		printToFile.println(logLine.toString());
		printToFile.close();
	}
	
	public void storeAttemptedLogin(String user, String password) throws UnknownHostException, SocketException{
		logLine = new StringBuilder();
		
		//thread safe version
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy h:mm:ss a");
		String formattedDate = sdf.format(date);
		
		logLine.append("*LOGIN UNSUCESSFUL* -" + "Username: " + user + " - ");
		logLine.append("Password: " + password + " - " + "IP: " + getIpAddress() + " - Date " + formattedDate);
		
		printToFile.println(logLine.toString());
		printToFile.close();	
	}
	
	public String getIpAddress() throws UnknownHostException, SocketException{
		return InetAddress.getLocalHost().toString();
	}
	
}
