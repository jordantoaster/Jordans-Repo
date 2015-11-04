package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Daos.UserDao;
import Models.User;
import Utility.ResponseBase;

public class LoginAction implements Action {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		//is [] needed after 'input'
		String[] loginDetails = request.getParameterValues("input[]");		
		
		//for unit test mocking
		if(loginDetails == null){
			loginDetails = request.getParameterValues("input");
		}
			
		User user  = new User("","",""); //placeholder for facebook login scenario	
		Gson gson = new Gson();
		
		if(!loginDetails[0].equals("facebook")){
			user = new User(loginDetails[0], loginDetails[1], "standard");
		
			boolean isValidated = validateLoginDetails(user);
		
			UserDao dao = new UserDao();
		
			if(!isValidated){
				return gson.toJson(new ResponseBase("false","Ensure your username is correct - The password contains a letter, number and a symbol", "login"));
			}
		
			boolean foundUser = dao.findUser(user);
		
			if(!foundUser){
				return gson.toJson(new ResponseBase("false","Your details are not on the system", "login"));
			}
		
		}
		
		//lets the session know the user is valid, incase the routing structure is manipulated
		request.getSession().setAttribute("loggedInUser", user);
	    
		return gson.toJson(new ResponseBase("true","User found", "login"));
	}
		
	public boolean validateLoginDetails(User user){
		
        String patternString = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$";
        boolean matches = user.password.matches(patternString);
		
		if(user.username.length() < 6 || !matches){
			return false;
		}
				
		return true;
	}

}
