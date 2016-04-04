/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the userDao - inserting etc
 */

package Tests;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import com.google.gson.Gson;
import Daos.UserDao;
import Models.User;
import Utility.ResponseBase;

public class UserDaoTest {
	
	User user;
	User userTwo;
	UserDao dao = new UserDao();
	String outcome;
	ResponseBase response;
	Gson gson;

	@Before
	public void setup(){
        user = new User("jordan", "jordan1#", "standard");
        userTwo = new User("jordanfake", "jordan1#", "standard");
        outcome = "";
        gson = new Gson();
	}
	
	@Test
	public void test1createUserTest(){
		outcome = dao.createUser(userTwo, "Backup");
        response = gson.fromJson(outcome, ResponseBase.class);  
        assertEquals("true", response.getOutcome());
	}
	
	@Test
	public void test2UserDaoFind(){
		assertEquals(false, dao.findUser(user, "Backup"));
		assertEquals(true, dao.findUser(userTwo, "Backup"));
	}
	
	@Test
	public void test3UserDelete(){
		assertEquals(true, dao.deleteUser(user, "Backup"));
	}
	
}
