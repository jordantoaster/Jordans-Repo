/**
 * @author Jordan McDonald
 *
 * Description - unit tests for registration process
 */

package Tests;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import com.google.gson.Gson;
import Actions.RegisterAction;
import Models.User;
import Utility.ResponseBase;

public class RegisterActionTest {

	  private MockHttpServletRequest request;
	  private MockHttpServletResponse response;
	  private String[] input;
	  private RegisterAction register;
	  String outcome;
	  Gson gson;
	  ResponseBase jsonResponse;
	  User user;
	  String confirm;
	  
	  @Before
	  public void setup(){
	      request = new MockHttpServletRequest();
	      response = new MockHttpServletResponse();
	      register = new RegisterAction();
	      input = new String[3];
	      gson = new Gson();
	      user = new User("jordan", "jordan1#", "standard");	
	      confirm = "";
	  }
	  
	  @Test
	  public void testRegistrationValidation(){		
		input[0] = "jordan";
		input[1] = "jordan1#";
		input[2] = "jordan1#";
        request.addParameter("action", "login");
        request.addParameter("input", input);  
        outcome = register.execute(request, response);
        jsonResponse = gson.fromJson(outcome, ResponseBase.class);       
        assertEquals("false", jsonResponse.getOutcome());
        
        request.removeAllParameters();
        
		input[0] = "jordannn";
		input[1] = "jordan1#";
		input[2] = "jordan1#";
        request.addParameter("action", "login");
        request.addParameter("input", input);  
        outcome = register.execute(request, response);
        jsonResponse = gson.fromJson(outcome, ResponseBase.class);       
        //assertEquals("true", jsonResponse.getOutcome());
        
        request.removeAllParameters();
        
		input[0] = "jordan";
		input[1] = "jordan1#";
		input[2] = "jordan1";
        request.addParameter("action", "login");
        request.addParameter("input", input);  
        outcome = register.execute(request, response);
        jsonResponse = gson.fromJson(outcome, ResponseBase.class);       
        assertEquals("false", jsonResponse.getOutcome());
		  
	  }
	  
	  @Test
	  public void testRegistration(){
		  
		assertEquals(true,register.validateRegisterDetails(user, "jordan1#"));
		
		user = new User("jorda", "jordan1#", "standard");
		assertEquals(false,register.validateRegisterDetails(user, "jordan1#"));
		
		user = new User("jordan", "jordan1", "standard");
		assertEquals(false,register.validateRegisterDetails(user, "jordan1"));
		
		user = new User("jordan", "jordan#", "standard");
		assertEquals(false,register.validateRegisterDetails(user, "jordan#"));
		
	    user = new User("jordan", "jordan1#", "standard");	
		assertEquals(true,register.validateRegisterDetails(user, "jordan1#"));
		
	    user = new User("jordan", "jordan1#", "standard");	
		assertEquals(false,register.validateRegisterDetails(user, "jordan#"));
		  
	  }
}
