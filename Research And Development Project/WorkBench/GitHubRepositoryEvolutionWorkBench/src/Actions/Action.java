/**
 * @author Jordan McDonald
 *
 * Description - provides a core method signature for each action that can be performed on the system
 */

package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
 * Implementation of the strategy pattern - core functionality shared between many class implementation
 * */
public interface Action {
	public String execute(HttpServletRequest request, HttpServletResponse response);
}
