package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Daos.UserDao;
import Models.User;

public class LoginAction implements Action {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] loginDetails = request.getParameterValues("input[]");	
		User user = new User(loginDetails[0], loginDetails[1]);
		
		boolean isValidated = validateLoginDetails(user);
		UserDao dao = new UserDao();
		
		if(!isValidated){
			return "true";
		}

		return dao.findUser(user);
	}
	
	public boolean validateLoginDetails(User user){
		
		
		return true;
	}

}
