package com.myawesomeapp.utility;

//remove this and use user pojo
public class PopulateProfilePojoNeedRefactor {
	private String uid, password, balance;
	
	public PopulateProfilePojoNeedRefactor(String uid, String password, String balance){
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
