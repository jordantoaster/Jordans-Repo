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
		
		String[] loginDetails = request.getParameterValues("input[]");	
		User user = new User(loginDetails[0], loginDetails[1], "standard");
		
		boolean isValidated = validateLoginDetails(user);
		
		UserDao dao = new UserDao();
		Gson gson = new Gson();
		
		if(!isValidated){
			return gson.toJson(new ResponseBase("false","Ensure your username is correct - The password contains a letter, number and a symbol"));
		}

		return dao.findUser(user);
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
