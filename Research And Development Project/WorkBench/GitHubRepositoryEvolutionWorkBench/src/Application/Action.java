package Application;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
 * Implementation of the strategy pattern
 * */
public interface Action {
	public String execute(HttpServletRequest request, HttpServletResponse response);
}
