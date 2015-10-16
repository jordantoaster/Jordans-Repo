package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Daos.UserDao;
import Models.User;

public class RegisterAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] loginDetails = request.getParameterValues("input[]");	
		User user = new User(loginDetails[0], loginDetails[1], "standard");
		
		boolean isValidated = validateRegisterDetails(user, loginDetails[2]);

		UserDao dao = new UserDao();
		
		if(!isValidated){
			return "false";
		}
		
		String alreadyInSystem = dao.findUser(user);
		
		if(alreadyInSystem.equals(true)){
			return "false";
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
