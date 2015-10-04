package Application;

import javax.servlet.http.HttpServletRequest;

/*
 * Implements the Factory design pattern
 * */
public class ActionFactory {
	public static Action getAction(HttpServletRequest request){
		
		if(request.getParameter("action").equals("login")){
			return new LoginAction();
		}
		
		return new NoAction();
	}
}
