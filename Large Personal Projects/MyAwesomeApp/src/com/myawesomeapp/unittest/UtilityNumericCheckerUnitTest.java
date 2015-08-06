package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import org.junit.Test;

import com.myawesomeapp.utility.NumericChecker;

public class UtilityNumericCheckerUnitTest {

	NumericChecker check = new NumericChecker();
	
	@Test
	public void testCheckNumeric(){
		assertEquals(false, check.checkNumeric("aaa"));
		assertEquals(false, check.checkNumeric("password"));
		assertEquals(false, check.checkNumeric("hell00"));
		assertEquals(true, check.checkNumeric("1"));
		assertEquals(true, check.checkNumeric("33423423"));
		assertEquals(false, check.checkNumeric("1.66"));
	}
}
