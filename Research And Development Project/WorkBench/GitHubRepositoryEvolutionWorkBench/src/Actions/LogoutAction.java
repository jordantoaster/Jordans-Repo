package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LogoutAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {

		request.getSession().invalidate();
		
		return "logged out!";
	}

}
