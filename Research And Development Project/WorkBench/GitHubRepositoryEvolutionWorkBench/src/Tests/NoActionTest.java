package Tests;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import Actions.NoAction;

public class NoActionTest {
	
	NoAction action;
	private MockHttpServletRequest request;
	private MockHttpServletResponse response;

	@Before
	public void setup(){
		action = new NoAction();
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
	}
	
	@Test
	public void testNoAction(){
		assertEquals("",action.execute(request, response));
	}
}
