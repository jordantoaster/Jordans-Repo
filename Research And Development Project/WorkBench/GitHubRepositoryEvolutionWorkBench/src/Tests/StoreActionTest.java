package Tests;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import Actions.StoreAction;

public class StoreActionTest {
	
	String[] statInput = {"3212","1232","#","5435","1","#","212","435435","#","12th june 2012","19th June 2012","#","JQ"};
	StoreAction store;
	
	@Before
	public void setup(){
		store = new StoreAction();
	}
	
	@Test
	public void testGetData(){
		assertEquals(true,store.getData(statInput));
	}

}
