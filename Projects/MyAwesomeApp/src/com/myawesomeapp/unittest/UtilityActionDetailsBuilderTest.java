package com.myawesomeapp.unittest;

import org.junit.Before;
import org.junit.Test;

import com.myawesomeapp.utility.ActionDetailsBuilder;
import static org.junit.Assert.*;

public class UtilityActionDetailsBuilderTest {
	
	
	ActionDetailsBuilder builder = new ActionDetailsBuilder();
	
	@Before
	public void Setup(){
	
	}

	@Test
	public void TestCreateIp(){
		assertNotEquals("", builder.getIp());
	}
	
	@Test
	public void testGetDate(){
		//TODO HOW TO TEST DATE?
	}
}
