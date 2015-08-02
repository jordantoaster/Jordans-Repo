package com.myawesomeapp.utility;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

/*Creates session details, each completed string records activity on the app and actions performed for monitoring*/
public class ActionDetailsBuilder {

	public Action buildActionString(String message, String username) {
		
		String time = getTime();
		String ip = getIp();
		
		Action action = new Action(message, username, time, ip);

		return action;
	}

	private String getIp(){
		try {
			return InetAddress.getLocalHost().toString();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "";
	}

	private String getTime() {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy h:mm:ss a");
		
		return sdf.format(date);		
	}

}
