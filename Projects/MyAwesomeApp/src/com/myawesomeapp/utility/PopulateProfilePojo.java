package com.myawesomeapp.utility;

public class PopulateProfilePojo {
	private String uid, password, balance;
	
	public PopulateProfilePojo(String uid, String password, String balance){
		this.uid = uid;
		this.password = password;
		this.balance = balance;
	}
	
	public String getUid(){
		return uid;
	}
	
	public String getPassword(){
		return password;
	}
	
	public String getBalance(){
		return balance;
	}
}
