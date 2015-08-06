package com.myawesomeapp.mainapp.pojo;

/*Pojo utilised to contain information about a user*/
public class User {
	private String username;
	private String password;
	private String balance;
	private String profilePicture;
	
	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public User(String uName, String pWord, String balance, String profilePic){
		this.username = uName;
		this.password = pWord;
		this.balance = balance;
		this.profilePicture = profilePic;
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
