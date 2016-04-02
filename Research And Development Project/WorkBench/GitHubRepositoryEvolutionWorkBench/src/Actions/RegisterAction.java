/**
 * @author Jordan McDonald
 *
 * Description - handles the register request when attempting to use the system - validates - rejects - stores data
 */

package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Daos.UserDao;
import Models.User;
import Utility.ResponseBase;

public class RegisterAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] registerDetails = request.getParameterValues("input[]");	
		
		//for unit test mocking
		if(registerDetails == null){
			registerDetails = request.getParameterValues("input");
		}
		
		User user = new User(registerDetails[0], registerDetails[1], "standard");
		
		//determine if the details are secure
		boolean isValidated = validateRegisterDetails(user, registerDetails[2]);

		UserDao dao = new UserDao();
		Gson gson = new Gson();
		
		//if failed return a message to the UI
		if(!isValidated){
			return gson.toJson(new ResponseBase("false","Ensure your username is correct - The password contains a letter, number and a symbol - Passwords match", "register"));
		}
		
		//check if the user is already in the system
		boolean alreadyInSystem = dao.findUser(user);
		
		if(alreadyInSystem){
			return gson.toJson(new ResponseBase("false","username is already on the system", "register"));
		}

		//add the user to the system (mongoDB)
		return dao.createUser(user);
	}

	//using the input data determine if the security requirements are met
	public boolean validateRegisterDetails(User user, String confirmPassword) {
		
        String patternString = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{6,}$";
        boolean matches = user.password.matches(patternString);
		
		if(user.password.length() < 6 || user.username.length() < 6 || !matches || !confirmPassword.equals(user.password)){
			return false;
		}
		
		return true;
	}


}
