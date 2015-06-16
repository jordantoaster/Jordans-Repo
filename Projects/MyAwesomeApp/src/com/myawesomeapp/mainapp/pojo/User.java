package com.myawesomeapp.mainapp.pojo;

/*Pojo utilised to contain information about a user*/
public class User {
	private String username;
	private String password;
	
	public User(String uName, String pWord){
		this.username = uName;
		this.password = pWord;
	}
	
	public void setUsername(String uName){
		username = uName;
	}
	
	public String getUsername(){
		return username;
	}
	
	public void setPassword(String pWord){
		password = pWord;
	}
	
	public String getPassword(){
		return password;
	}
}
