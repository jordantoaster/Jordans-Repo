package com.myawesomeapp.utility;

import java.util.Random;

/*
 * Used to create a representation of a username in the web app url
 * Look up table subsitutes the alphabetical values with a numerical equivalent (a = 1) and vice versa
 * each is unique to the definition of the unique username feild
 * Then adds an element of randomness to reduce hacking potential by appending five digits at random.
 * */
public class StringUrlEncoder {

	private char[] alphabeticalValues = "abcdefghijklmnopqrstuvwxyz".toCharArray();
	private int[] numericalValues = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26};
	private final int maxIterationLength = 26;
	
	public String encode(String plainText){
		
		StringBuilder builder = new StringBuilder();
		char plainTextCharArray[] = plainText.toCharArray();
		
		builder = performLookup(plainTextCharArray);
		builder = appendRandomDigits(builder);
		
		return builder.toString();
	}

	private StringBuilder performLookup(char[] plainTextCharArray) {
		
		StringBuilder builder = new StringBuilder();
		
		//swap digits and letters with equivalent representations
		for(int i = 0; i < plainTextCharArray.length; i++){				
			if(Character.isDigit(plainTextCharArray[i])){
				for(int j = 0; j < maxIterationLength+1; j++){					
					if(Character.getNumericValue(plainTextCharArray[i]) == numericalValues[j]){
						builder.append(alphabeticalValues[j]);
						break;
					}
				}
			} else {
				for(int j = 0; j < maxIterationLength; j++){					
					if(plainTextCharArray[i] == alphabeticalValues[j]){
						builder.append(numericalValues[j]);
						break;
					}
				}
			}
		}
		return builder;
	}

	private StringBuilder appendRandomDigits(StringBuilder builder) {
		
		Random rand = new Random();
		final int iterations = 5;

		for(int i = 0; i<iterations;i++){
			builder.append(rand.nextInt(9) + 1);
		}
		
		return builder;
	}
	
	
	//Currently not in use - eg encode sets 0 to 18, decoding that number back to 0 introduces issues
	//since each number in the look up is evaluated as 1 then 8. creating a wrong result
	//potentilly attempt to fix and use in place of server call
	public String decode(String encodedText){
		
		encodedText = removeRandomDigits(encodedText);
		
		StringBuilder builder = performLookup(encodedText.toCharArray());
			
		return builder.toString();
	}

	private String removeRandomDigits(String encodedText) {

		encodedText = encodedText.substring(0, encodedText.length() - 5);
		
		return encodedText;
	}
}
