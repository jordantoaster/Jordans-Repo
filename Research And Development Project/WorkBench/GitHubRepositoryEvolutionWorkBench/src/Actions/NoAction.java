/**
 * @author Jordan McDonald
 *
 * Description - A utility class to handle the case where an input action is incorrect - defaults to no action and informs the user
 */

package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NoAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		return "";
	}


}
