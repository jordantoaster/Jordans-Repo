package Actions;

import javax.servlet.http.HttpServletRequest;

/*
 * Implements the Factory design pattern
 * */
public class ActionFactory {
	public static Action getAction(HttpServletRequest request){
		
		System.out.println(request.getParameter("action"));
		
		if(request.getParameter("action").equals("login")){
			return new LoginAction();
		}
		
		if(request.getParameter("action").equals("register")){
			return new RegisterAction();
		}
		
		if(request.getParameter("action").equals("store")){
			return new StoreAction();
		}
		
		return new NoAction();
	}
}
