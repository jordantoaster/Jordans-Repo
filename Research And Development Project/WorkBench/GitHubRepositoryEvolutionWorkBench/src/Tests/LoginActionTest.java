/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the login process
 */

package Tests;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import com.google.gson.Gson;
import Actions.LoginAction;
import Models.User;
import Utility.ResponseBase;

public class LoginActionTest {
	
	  private MockHttpServletRequest request;
	  private MockHttpServletResponse response;
	  private String[] input;
	  private LoginAction login;
	  String outcome;
	  Gson gson;
	  ResponseBase jsonResponse;
	  User user;

	@Before
	public void setup(){
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        login = new LoginAction();
        input = new String[2];
        gson = new Gson();
        user = new User("jordan", "jordan1#", "standard");
	}
	
	@Test
	public void testLogin(){
		input[0] = "jordan";
		input[1] = "jordan1#";
        request.addParameter("action", "login");
        request.addParameter("input", input);  
        outcome = login.execute(request, response);
        jsonResponse = gson.fromJson(outcome, ResponseBase.class);       
        assertEquals("true", jsonResponse.getOutcome());
        
        request.removeAllParameters();
        
		input[0] = "jorda";
		input[1] = "jordan1#";
        request.addParameter("action", "login");
        request.addParameter("input", input);  
        outcome = login.execute(request, response);
        jsonResponse = gson.fromJson(outcome, ResponseBase.class);       
        assertEquals("false", jsonResponse.getOutcome());
        
        request.removeAllParameters();
	}
	
	@Test
	public void testLoginValidation(){
		assertEquals(true,login.validateLoginDetails(user));
		
		user = new User("jorda", "jordan1#", "standard");
		assertEquals(false,login.validateLoginDetails(user));
		
		user = new User("jordan", "jordan1", "standard");
		assertEquals(false,login.validateLoginDetails(user));
		
		user = new User("jordan", "jordan#", "standard");
		assertEquals(false,login.validateLoginDetails(user));
	}
}
