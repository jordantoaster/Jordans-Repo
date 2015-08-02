package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import org.junit.Test;

import com.myawesomeapp.utility.StringUrlEncoder;

public class UtilityStringUrlEncoderTest {
	
    StringUrlEncoder encoder = new StringUrlEncoder();
    String encodedText = encoder.encode("jordan11");
    String encodedTextTwo = encoder.encode("job49");
    
	
	@Test
	public void testEncode(){
		assertEquals("914173013bb", encodedText.substring(0, encodedText.length() - 5));
		assertEquals("9141ej", encodedTextTwo.substring(0, encodedTextTwo.length() - 5));
	}

}
