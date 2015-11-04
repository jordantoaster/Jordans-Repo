package Tests;

import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import Filters.AuthenticatonFilter;
import Models.User;

public class FilterTest {
	
	private MockHttpServletRequest request;
	private MockHttpServletResponse response;
	private AuthenticatonFilter filter;
	private User user;
	
	@Before
	public void setup(){
		filter =new AuthenticatonFilter();
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        user = new User("","","");
	}
	
	@Test
	public void testFilter(){
		//TODO
	}

}
