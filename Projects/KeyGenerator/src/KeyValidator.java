import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;


public class KeyValidator {
	String userKey;
	private String filePath = "src/Keys.txt";
	
	public KeyValidator(String userKey){
		this.userKey = userKey;
	}
	
	//if user input is inside the text file true is returned
	public boolean validKey() throws IOException{
		boolean isValid = false;
		String key;
		
		BufferedReader tempFileOfKeys = createFileReader();
		int numOfKeysInFile = getNumOfKeys(tempFileOfKeys);
		
		//resets the reader to the first line
		BufferedReader fileOfKeys = createFileReader();
		
		//loops through all lines of keys in the text file
		for(int idx = 0; idx<numOfKeysInFile;idx++){
			key = fileOfKeys.readLine();
			
			//if the current line in the text file = the user input
			if(key.equals(userKey)) {
				isValid = true; 
				break; 
			}
		}
		
		return isValid;
	}
	
	//method creates a file buffered reader instance
	private BufferedReader createFileReader() throws FileNotFoundException{
		FileReader fileReader = new FileReader(filePath);
		BufferedReader bufferedReader = new BufferedReader(fileReader);
		return bufferedReader;
	}
	
	//method returns the number of keys stored in my text file
	private int getNumOfKeys(BufferedReader fileOfKeys) throws IOException{
		String line;
		int numLines =0;
		
		while((line = fileOfKeys.readLine()) != null){
			numLines++;
		}
		return numLines;
	}
	
	
}
