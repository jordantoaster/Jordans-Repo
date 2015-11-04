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
	public void testUserDaoFind(){
		assertEquals(true, dao.findUser(user));
		assertEquals(false, dao.findUser(userTwo));
	}
	
	@Test
	public void createUserTest(){
		outcome = dao.createUser(userTwo);
        response = gson.fromJson(outcome, ResponseBase.class);  
        assertEquals("true", response.getOutcome());
	}
	
}
