import java.util.ArrayList;

public class CalculateMissingNumProblemBinarySearch {

	public static void run() {

		// get psuedo generated numbers
		int[] randomNumbers = CalculateMissingNumProblem.getArrayOfRandomInts();

		// Timer Thread to run concurrently with num problem process
		System.out.println("Timer Begin:");
		Timer timer = new Timer();
		timer.startTimer();

		ArrayList<Integer> sortedNumbers = sortNumbers(randomNumbers);

		performBinarySearch(sortedNumbers);

		timer.endTimer();
		System.out.println(timer.getDuration());
	}

	// accounts for an even amount of numbers
	private static void performBinarySearch(ArrayList<Integer> sortedNumbers) {
		// -1 accounts for 0 indexing
		int midPoint = (sortedNumbers.size() / 2) - 1;
		int midPointModifier = 0;
		int amountOfHalves = getNumHalves(sortedNumbers.size());
		ArrayList<Integer> missingNumbers = new ArrayList<Integer>();

		for (int i = 0; i < sortedNumbers.size(); i++) {

			midPointModifier = 0;
			midPoint = (sortedNumbers.size() / 2) - 1;
			
			//evaluate number n amount of times
			for (int j = 0; j < amountOfHalves+1; j++) {
				
				// if found quit
				if (i == sortedNumbers.get(midPoint)) {
					midPoint = (sortedNumbers.size() / 2) - 1;
					break;
				} else if(midPoint == 1){ //check against lower limit for neighbours
					if (i == sortedNumbers.get(0)) {
						break;
					} else {
						//not in bottom half
						missingNumbers.add(i);
					}
				} else if(midPoint == sortedNumbers.size()-1){ //check against upper limit for neighbour
					if (i == sortedNumbers.get(sortedNumbers.size()-1)) {
						break;
					} else {
						//not in top half
						missingNumbers.add(i);
					}
				}
				
				// look at bottom half next midpoint
				if (i < sortedNumbers.get(midPoint)) {
					midPointModifier = midPoint / 2;
					midPoint = midPoint - midPointModifier;
				}
				// look at top half new mid point
				else if (i > sortedNumbers.get(midPoint)) {
					midPointModifier = midPointModifier / 2;
					midPoint = midPoint + midPointModifier;
				}
			}
		}
		System.out.println("");
	}

	private static int getNumHalves(int size) {
		int count = 0;
		int currNum = size;
		
		for(int i=0; i<size;i++){
			
			currNum = Math.round(currNum / 2);
			
			if(currNum <= 0){ 
				break; 
			}	
			
			count++;
		}
		
		return count;
	}

	// creates ascending order of numbers for binary search
	private static ArrayList<Integer> sortNumbers(int[] randomNumbers) {

		ArrayList<Integer> sortedArray = new ArrayList<Integer>();

		// adds first random number by default (list already empty)
		sortedArray.add(randomNumbers[0]);

		// evaluate each random number
		for (int i = 1; i < randomNumbers.length; i++) {
			// if greater than the first num then start the positioning process
			if (randomNumbers[i] >= sortedArray.get(0)) {
				for (int p = 0; p < sortedArray.size(); p++) {
					// if less then curr position in list then add below it
					if (randomNumbers[i] < sortedArray.get(p)) {
						sortedArray.add(p, randomNumbers[i]);
						break;
						// if index + 1 = the size then the new num is the
						// largest in the list, add at top
					} else if (p + 1 == sortedArray.size()) {
						sortedArray.add(p + 1, randomNumbers[i]);
						break;
					}
				}
				// if less then the first num in ordered list then simply add to
				// the start
			} else {
				sortedArray.add(0, randomNumbers[i]);
			}
		}

		return sortedArray;
	}

}
