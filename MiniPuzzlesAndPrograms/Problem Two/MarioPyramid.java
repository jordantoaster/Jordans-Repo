import java.util.Scanner;
 /*
  *   a program that recreates this half-pyramid using hashes (#) for blocks. However, 
  *   to make things more interesting, first prompt the user for the half-pyramid’s height,
  *   a non-negative integer no greater than 23. (The height of the half-pyramid pictured above happens to be 8.)
  *   If the user fails to provide a non-negative integer no greater than 23, you should re-prompt for the same 
  *   again. Then, generate (with the help of printf and one or more loops) the desired half-pyramid. Take care 
  *   to align the bottom-left corner of your half-pyramid with the left-hand edge of your terminal window, 
  *   as in the sample output below, wherein underlined text represents some user’s input.
  *   
  *    		##
      	   ###
     	  ####
    	 #####
   		######
  	   #######
      ########
	 #########
  */

public class MarioPyramid {
	
	/*
	 * My approach - I took a top down solution route, by rendering each layer from the top until the last one -
	 * termination occurs when the input +1 is reached in the outer loop, accounting for the pyramic starting -
	 * with a width of 2. indentation at the end of each loop is decremented and a new line is taken -
	 * The index i is used in order to control the width of the pyramid layer with i starting as 2 as defined -
	 * in the assignment parameters
	 */
	public static void main(String[] args){
		
		int input = getInput();
		
		boolean isValid = checkInput(input);
		
		if(isValid){
			generatePyramid(input);
		} else {
			System.out.println("Enter Correct Input Values Please");
			System.out.println("Height attempt was: " +  input);
		}
	}

	private static boolean checkInput(int input) {

		//defined validation parameters
		if(input >= 0 && input < 23)
			return true;
		
		return false;
	}

	private static void generatePyramid(int input) {
		
		//indent amount for first row
		int indent = input-1;
		
		//start at top, always width of two
		//+1 is required to account for the index starting at 2 (since the top is 2 in width)
		for(int i = 2; i <= input+1; i++){
			
			//perform indent
			for(int k = 0; k<indent;k++){
				System.out.print(" ");
			}
			
			//print out hashes based on the value of i
			for(int j = 0; j<i; j++){
				System.out.print("#");
			}
			
			//take blank space and decrease indent to account for more hashes and pyramid structure
			System.out.println();
			indent--;
		}
	}

	private static int getInput() {
		
		System.out.println("Enter a numeric value please: ");	
		
		Scanner scan = new Scanner(System.in);
		int i = scan.nextInt();
		
		return i;
	}
	
}
