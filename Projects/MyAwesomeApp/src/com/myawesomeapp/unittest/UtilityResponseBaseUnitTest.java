package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import org.junit.Test;

import com.myawesomeapp.utility.ResponseBase;

public class UtilityResponseBaseUnitTest {
	
	String feedback = "success!";
	String isSuccess = "true";
	
	ResponseBase response = new ResponseBase(feedback, isSuccess);
	
	@Test
	public void testConstructor(){
		assertEquals(feedback, response.getFeedback());
		assertEquals(isSuccess, response.getSuccess());
	}
	
}
