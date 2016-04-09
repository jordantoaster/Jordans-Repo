/**
 * @author Jordan McDonald
 *
 * Description - utility class to generate large arrays for testing
 */

package Utility;

public class TestSetup {
	
	public static double[] generateRandomArray(int size){
		double[] kickerNumbers = new double[size];
		for(int i = 0; i < size; i++) {
		    kickerNumbers[i] = (double)(Math.random()*0+9);
		}
		return kickerNumbers;
	}
	
	public static int[] generateRandomArrayInt(int size){
		int[] kickerNumbers = new int[size];
		for(int i = 0; i < size; i++) {
		    kickerNumbers[i] = (int)(Math.random()*0+9);
		}
		return kickerNumbers;
	}
	
	public static String[] generateRandomStringArray(int size){
		String[] lookup = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p",};
		String[] kickerNumbers = new String[size];
		for(int i = 0; i < size; i++) {
		    kickerNumbers[i] = lookup[(int)(Math.random()*0+9)];
		}
		return kickerNumbers;
	}
}
