/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the clear action
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.IssueDao;
import Models.Commits;
import Models.Issues;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import Actions.ClearAction;

public class ClearActionTest {
	
	  private MockHttpServletRequest request;
	  private MockHttpServletResponse response;
	  
	  @Test
	  public void clearDB(){
		  ClearAction clear = new ClearAction();
		  assertEquals("Database Cleared!", clear.execute(request, response));
	  }

}
