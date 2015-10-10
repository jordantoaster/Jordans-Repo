package Models;

public class User {
	
	public String username;
	public String password;
	
	public User(String username, String password){
		this.username = username;
		this.password = password;
	}
	
	public String getName() {
		return username;
	}
	public void setName(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
