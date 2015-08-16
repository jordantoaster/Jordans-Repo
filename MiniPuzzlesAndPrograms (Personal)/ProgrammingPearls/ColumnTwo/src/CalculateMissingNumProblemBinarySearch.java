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
		

		timer.endTimer();
		System.out.println(timer.getDuration());
	}

	// creates ascending order of numbers for binary search
	private static ArrayList<Integer> sortNumbers(int[] randomNumbers) {

		ArrayList<Integer> sortedArray = new ArrayList<Integer>();

		// adds first random number by default (list already empty)
		sortedArray.add(randomNumbers[0]);

		// evaluate each random number
		for (int i = 1; i < randomNumbers.length; i++) {
			//if greater than the first num then start the positioning process
			if (randomNumbers[i] >= sortedArray.get(0)) {
				for (int p = 0; p < sortedArray.size(); p++) {
					//if less then curr position in list then add below it
					if (randomNumbers[i] < sortedArray.get(p)) {
						sortedArray.add(p, randomNumbers[i]);
						break;
					//if index + 1 = the size then the new num is the largest in the list, add at top
					} else if (p + 1 == sortedArray.size()) {
						sortedArray.add(p + 1, randomNumbers[i]);
						break;
					}
				}
			//if less then the first num in ordered list then simply add to the start
			} else {
				sortedArray.add(0, randomNumbers[i]);
			}
		}

		return sortedArray;
	}

}
