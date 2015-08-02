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

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

}
