import java.util.ArrayList;
import java.util.Random;

/*
 * Given a sequential file that contains at most n amount of 32 bit integers...
 * in random order, find a 32 integer that is not in the file. There is at least...
 * one missing. 
 * Solution 1 assumes ample memory avaliable. 
 * TODO - Solution 2 restricted memory.
 * */

public class CalculateMissingNumProblem {

	//made static simply for ease of use (multiple instances are not required)
	public static void run(){
		
		//get psuedo generated numbers
		int[] randomNumbers = getArrayOfRandomInts();
		
		//Timer Thread to run concurrently with num problem process
		System.out.println("Timer Begin:");
		Timer timer = new Timer();
		Thread timeThread = new Thread(timer, "hello");
		timeThread.start(); 
				
		//ADD MISSING NUMBER ATTEMPT HERE
		ArrayList<Integer> missingNumbers = findMissingNumbersNxNSolution(randomNumbers);
		
		timer.endTimer();
		
		//Print missing numbers and time taken in milliseconds
		printMissingNumbers(missingNumbers);		
		System.out.println("Time taken: " + timer.getDuration());
	}

	private static void printMissingNumbers(ArrayList<Integer> missingNumbers) {
		System.out.println("Missing Numbers::");
		for(int i=0;i<missingNumbers.size(); i++){
			System.out.println(missingNumbers.get(i));
		}
	}

	private static ArrayList<Integer> findMissingNumbersNxNSolution(int[] randomNumbers) {
		ArrayList<Integer> missingNumbers = new ArrayList<Integer>();
		final int maxAmount = randomNumbers.length;
		
		for(int i = 0; i < maxAmount; i++){
			for(int j = 0; j < maxAmount;j++){
				if(i == randomNumbers[j]){
					break;
				}
				if(j == maxAmount-1){
					missingNumbers.add(i);
				}
			}			
		}		
		return missingNumbers;
	}

	//Fills an int array with random values
	static int[] getArrayOfRandomInts() {	
		
		//max amount is an indicator of size and the potential amount of integers in each index.
		final int maxAmount = 100;
		
		Random rand = new Random();
		int[] randomNumbers = new int[maxAmount];
		
		for(int i = 0; i< maxAmount; i++)
		{
			randomNumbers[i] = rand.nextInt(maxAmount);
		}

		return randomNumbers;
	}
	
	
}
