package ColumnTwo;

/*
 * Program takes an array and shifts each element to the right by an amount 'n'
 * Problem solving activity
 * */
public class ShiftArray {

	public static void run(){
		int[] testArray = getTestArray(10);
		int[] shiftArray = shiftRight(testArray,2);
		print(testArray, shiftArray);
	}

	private static void print(int[] testArray, int[] shiftArray) {

		System.out.println("orginal array: ");
		for(int i =0; i<testArray.length; i++){
			System.out.print(testArray[i]);
		}	
		
		System.out.println();
		
		System.out.println("shifted array: ");
		for(int j =0; j<shiftArray.length; j++){
			System.out.print(shiftArray[j]);
		}
	}

	private static int[] shiftRight(int[] testArray, int amount) {

		final int size = testArray.length;
		int[] helper = new int[size];
		
		//access original array values
		for(int i = 0; i<size; i++){
			//gets what the position would become.
			int check = i + amount;
			//if position => than indice max then adjust new position to start from index 0
			if(check >= size){
				//gets difference and sets new position to that value
				int diff = check - size;				
				helper[diff] = i;			
			} else {
				//perform shift to calculated position
				helper[i+amount] =  i;
			}
		}		
		return helper;		
	}

	//creates a basic array of a specified length
	private static int[] getTestArray(int size) {
		int[] testArray = new int[size];
		
		for(int i=0; i<size; i++){
			testArray[i] = i;
		}
		
		return testArray;
	}
}
