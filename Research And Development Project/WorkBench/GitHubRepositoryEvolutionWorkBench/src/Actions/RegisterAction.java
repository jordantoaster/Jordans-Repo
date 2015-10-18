package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Daos.UserDao;
import Models.User;
import Utility.ResponseBase;

public class RegisterAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] loginDetails = request.getParameterValues("input[]");	
		User user = new User(loginDetails[0], loginDetails[1], "standard");
		
		boolean isValidated = validateRegisterDetails(user, loginDetails[2]);

		UserDao dao = new UserDao();
		Gson gson = new Gson();
		
		if(!isValidated){
			return gson.toJson(new ResponseBase("false","Ensure your username is correct - The password contains a letter, number and a symbol - Passwords match"));
		}
		
		String alreadyInSystem = dao.findUser(user);
		
		if(alreadyInSystem.equals(true)){
			return gson.toJson(new ResponseBase("false","username is already on the system"));
		}

		return dao.createUser(user);
	}

	private boolean validateRegisterDetails(User user, String confirmPassword) {
		
        String patternString = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{6,}$";
        boolean matches = user.password.matches(patternString);
		
		if(user.password.length() < 6 || user.username.length() < 6 || !matches || !confirmPassword.equals(user.password)){
			return false;
		}
		
		return true;
	}

}
