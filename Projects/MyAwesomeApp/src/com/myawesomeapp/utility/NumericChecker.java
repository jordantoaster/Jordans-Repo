package com.myawesomeapp.utility;

/*checks if a string can be translated to an int
 * if not then it contains non numeral values*/

public class NumericChecker {
	public boolean checkNumeric(String s){
		int i;
		try {
			i = Integer.parseInt(s);
			return true;
		} catch(Exception e){
			return false;
		}	
	}
}
