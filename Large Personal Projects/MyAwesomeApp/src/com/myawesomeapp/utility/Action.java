package com.myawesomeapp.utility;

public class Action {	

	private String message;
	private String username;
	private String time;
	private String ip;
	
	public Action(String message, String username, String time, String ip) {
		this.message = message;
		this.username = username;
		this.time = time;
		this.ip = ip;
	}

	public String getMessage() {
		return message;
	}

	public String getUsername() {
		return username;
	}

	public String getTime() {
		return time;
	}

	public String getIp() {
		return ip;
	}

}
