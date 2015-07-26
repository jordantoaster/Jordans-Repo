package com.myawesomeapp.unittest;

import static org.junit.Assert.*;
import org.junit.*;

import com.myawesomeapp.utility.DatabaseConnectionHelper;

public class UtilityConnectionHelperUnitTest {
	
	DatabaseConnectionHelper helper = new DatabaseConnectionHelper();

	@Test
	public void testInit(){
        assertNotNull(helper.init());
	}
}
