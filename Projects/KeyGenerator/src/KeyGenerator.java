

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

public class KeyGenerator {

	private final int[] possibleNumbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	private final char[] possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
	private final int targetLength = 20;
	private final int chosenArrayLength = 10;
	private final Random random = new Random();

	public String createKey() {
		int letterWeighting = determineLetterWeigthing();
		int numberWeighting = determineNumberWeigthing();

		int[] chosenNumbers = selectNumbers();
		char[] chosenLetters = selectLetters();

		StringBuilder key = new StringBuilder();

		while (key.length() < targetLength) {
			for (int j = 0; j < letterWeighting && key.length() < targetLength; j++) {
				int randomIndex = random.nextInt(chosenLetters.length - 1);
				key.append(chosenLetters[randomIndex]);
			}
			for (int k = 0; k < numberWeighting && key.length() < targetLength; k++) {
				int randomIndex = random.nextInt(chosenNumbers.length - 1);
				key.append(chosenNumbers[randomIndex]);
			}
		}
		outputKeyToFile(key.toString());
		return key.toString();
	}

	private void outputKeyToFile(String key) {
			PrintWriter printToFile;
			try {
				printToFile = new PrintWriter(new FileWriter("src/Keys.txt", true));
				printToFile.println(key);
				printToFile.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}

	private char[] selectLetters() {
		char[] chosenLetters = new char[chosenArrayLength];

		for (int j = 0; j < chosenArrayLength; j++) {
			int randomIndex = random.nextInt(possibleLetters.length);
			chosenLetters[j] = possibleLetters[randomIndex];
		}
		return chosenLetters;
	}

	private int[] selectNumbers() {
		int[] chosenNumbers = new int[chosenArrayLength];

		for (int j = 0; j < chosenArrayLength; j++) {
			int randomIndex = random.nextInt(possibleNumbers.length);
			chosenNumbers[j] = possibleNumbers[randomIndex];
		}
		return chosenNumbers;
	}

	private int determineLetterWeigthing() {
		return random.nextInt(4) + 1;
	}

	private int determineNumberWeigthing() {
		return random.nextInt(4) + 1;
	}
}
