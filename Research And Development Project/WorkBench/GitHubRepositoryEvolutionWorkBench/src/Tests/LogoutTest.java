/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the logout process
 */

package Tests;

import static org.junit.Assert.*;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import Actions.LogoutAction;

public class LogoutTest {
	
	
    private MockHttpServletRequest request;
	private MockHttpServletResponse response;

	@Test
	public void testLogout(){
		LogoutAction logout = new LogoutAction();
		//assertEquals("logged out!", logout.execute(request, response));
	}
}
