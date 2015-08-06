package encryption;

import javax.swing.text.StyledEditorKit.ForegroundAction;

public class SDES {
	static String tenBitKey = "1001100110";
	 // S-Boxes
	final static int[][] S0 = { {1,0,3,2} , {3,2,1,0} , {0,2,1,3} , {3,1,3,2} } ;
	final static int[][] S1 = { {0,1,2,3}, {2,0,1,3}, {3,0,1,0}, {2,1,0,3}} ; 

	public static void main(String[] args) {
		////System.out.println(encrypt('a'));
	}
	
	public static String encryptWord(String word){
		String encryptedWord = "";
		char[] charArray = word.toCharArray();
		for (char c : charArray) {
			encryptedWord += encrypt(c);
		}
		return encryptedWord;
	}
	
	///
	///Encrypt methods start
	///
	public static char encrypt(char plainLetter){
		int ascii = (int) plainLetter;
		String binary = Integer.toBinaryString(ascii);
		while(binary.length() < 8){
			binary = "0"+binary;
		}
		//System.out.println(ascii);
		//System.out.println(binary);
		String k1 = performK1Generation();
		String k2 = performK2Generation();
		//System.out.println("Key1:"+k1);
		//System.out.println("Key2:"+k2);
		String ip = performInitialPermutation(binary);
		String Fk1 = mapF(ip, k1);
		Fk1 = swap(Fk1);
		String Fk2 = mapF(Fk1, k2);
		String finalPermutation = perfromFinalPermutation(Fk2);
		//System.out.println(finalPermutation);
		
		int encryptedDecimal = Integer.parseInt(finalPermutation, 2);
		char ciperText = (char)encryptedDecimal;
		
		return ciperText;
	}
	
	private static String performK1Generation(){
		String p10 = "6 9 10 3 1 8 5 2 7 4";
		String p8 = "2 1 3 7 8 5 6 4";
		String key = performSwitch(p10, tenBitKey);
		key = shiftLeft(key, 1);
		key = performSwitch(p8, key);
		return key;
	}
	
	private static String performK2Generation(){
		String p10 = "6 9 10 3 1 8 5 2 7 4";
		String p8 = "2 1 9 7 8 5 6 4";
		String key = performSwitch(p10, tenBitKey);
		key = shiftLeft(key, 3);
		key = performSwitch(p8, key);
		return key;
	}
	
	public static String performInitialPermutation(String binary){
		String ip = "5 8 1 7 3 6 2 4";
		//System.out.println("IP:"+performSwitch(ip, binary));
		return performSwitch(ip, binary);
	}
	
	public static String mapF(String ip, String key){
		String ep = "3 1 2 4 1 4 3 2";
		String p4 = "2 4 1 3";
		String right = right(ip);
		//System.out.println("right:"+right);
		String epr = performSwitch(ep, right);
		//System.out.println("EPR:"+epr);
		String eprk1 = performExOr(epr, key);
		//System.out.println("EPRk1:"+eprk1);
		char[] eprk1array = eprk1.toCharArray();
		String row1String = eprk1array[0] + "" + eprk1array[3];
		int row1 = Integer.parseInt(row1String, 2);
		String col1String = eprk1array[1] + "" + eprk1array[2];
		int col1 = Integer.parseInt(col1String, 2);
		//System.out.println("row:"+row1);
		//System.out.println("col:"+col1);
		int sbox1 = S0[row1][col1];
		String sboxes = Integer.toBinaryString(sbox1);
		//System.out.println("sbox1:"+sboxes);
		if(sboxes.length() == 1){
			sboxes = "0"+sboxes;
		}
		String row2String = eprk1array[0+4] + "" + eprk1array[3+4];
		int row2 = Integer.parseInt(row2String, 2);
		String col2String = eprk1array[1+4] + "" + eprk1array[2+4];
		int col2 = Integer.parseInt(col2String, 2);
		int sbox2 = S1[row2][col2];
		String sbox2str = Integer.toBinaryString(sbox2);
		if(sbox2str.length() == 1){
			sbox2str = "0"+sbox2str;
		}
		sboxes += sbox2str;
		//System.out.println("sbox2:"+sbox2str);
		//System.out.println("sboxes:"+sboxes);
		
		String fk1 = performSwitch(p4, sboxes);
		String left = left(ip);
		//System.out.println("left:"+left);
		fk1 = performExOr(left, fk1) + right;
		//System.out.println("fk1:"+fk1);
		
		return fk1;
	}
	
	private static String perfromFinalPermutation(String input){
		String ip = "4 1 3 5 7 2 8 6";
		return performSwitch(ip, input);
	}
	
	private static String performSwitch(String p, String key){
		String[] numbers = p.split(" ");
		char[] binaryArray = key.toCharArray();
		String returnBinary = "";
		for (String number : numbers) {
			returnBinary += binaryArray[Integer.parseInt(number)- 1];
		}
		//System.out.println(returnBinary);
		return returnBinary;
	}
	
	private static String shiftLeft(String key, int spaces){
		char[] binaryArray = key.toCharArray();
		char[] leftSide = new char[binaryArray.length/2];
		char[] rightSide = new char[binaryArray.length/2];
		for (int i = 0; i < binaryArray.length/2; i++) {
			leftSide[i] = binaryArray[i];
			rightSide[i] = binaryArray[i + binaryArray.length/2];
		}
		String returnString = "";
		int position = 0;
		for(int i = 0; i < leftSide.length; i++){
			if(i >= leftSide.length-(spaces)){
				returnString += leftSide[position];
				position++;
			}else{
				returnString += leftSide[i+spaces];
			}
		}
		position = 0;
		for(int i = 0; i < rightSide.length; i++){
			if(i >= rightSide.length-(spaces)){
				returnString += rightSide[position];
				position++;
			}else{
				returnString += rightSide[i+spaces];
			}
		}
		//System.out.println(returnString);
		return returnString;
	}
	
	private static String performExOr(String key1, String key2){
		char[] key1array = key1.toCharArray();
		char[] key2array = key2.toCharArray();
		String returnString = "";
		for (int i = 0; i < key1array.length; i++) {
			if(key1array[i] == key2array[i]){
				returnString += "0";
			}else{
				returnString += "1";
			}
		}
		//System.out.println(returnString);
		return returnString;
	}
	
	public static String left(String input){
		String left = "";
		char[] inputArray = input.toCharArray();
		for (int i = 0; i < inputArray.length/2; i++) {
			left+=inputArray[i];
		}
		return left;
	}
	
	public static String right(String input){
		String right = "";
		char[] inputArray = input.toCharArray();
		for (int i = inputArray.length/2; i < inputArray.length; i++) {
			right+=inputArray[i];
		}
		return right;
	}
	
	public static String swap(String input){
		return right(input) + left(input);
	}
	
	///
	///Decrypt methods if needed
	///
	
//	public static char decrypt(char cipherLetter){
//		int ascii = (int) cipherLetter;
//		String binary = Integer.toBinaryString(ascii);
//		while(binary.length() < 8){
//			binary = "0"+binary;
//		}
//		//System.out.println(ascii);
//		//System.out.println(binary);
//		reverseFinalPermutation(binary);
//		
//		
//		
////		String k1 = performK1Generation();
////		String k2 = performK2Generation();
////		//System.out.println("Key1:"+k1);
////		//System.out.println("Key2:"+k2);
////		String ip = performInitialPermutation(binary);
////		String Fk1 = mapF(ip, k1);
////		Fk1 = swap(Fk1);
////		String Fk2 = mapF(Fk1, k2);
////		String finalPermutation = perfromFinalPermutation(Fk2);
////		//System.out.println(finalPermutation);
////		
////		int encryptedDecimal = Integer.parseInt(finalPermutation, 2);
////		char ciperText = (char)encryptedDecimal;
//		
//		return 'a';
//	}
//
//	private static String reverseFinalPermutation(String input) {
//		String ip = "4 1 3 5 7 2 8 6";
//		return performReverseSwitch(ip, input);
//	}
//	
//	private static String performReverseSwitch(String p, String key){
//		String[] numbers = p.split(" ");
//		char[] binaryArray = key.toCharArray();
//		char[] returnArray = new char[key.length()];
//		String returnBinary = "";
//		int i = 0;
//		//System.out.println("key:"+key);
//		for (String number : numbers) {
//			returnArray[Integer.parseInt(number)- 1] += binaryArray[i];
//			i++;
//		}
//		returnBinary = new String(returnArray);
//		//System.out.println("hi"+returnBinary);
//		return returnBinary;
//	}
//	
//	public static String mapFReverse(String ip, String key){
////		String ep = "3 1 2 4 1 4 3 2";
////		String p4 = "2 4 1 3";
////		String right = right(ip);
////		//System.out.println("right:"+right);
////		String epr = performSwitch(ep, right);
////		//System.out.println("EPR:"+epr);
////		String eprk1 = performExOr(epr, key);
////		//System.out.println("EPRk1:"+eprk1);
////		char[] eprk1array = eprk1.toCharArray();
////		String row1String = eprk1array[0] + "" + eprk1array[3];
////		int row1 = Integer.parseInt(row1String, 2);
////		String col1String = eprk1array[1] + "" + eprk1array[2];
////		int col1 = Integer.parseInt(col1String, 2);
////		//System.out.println("row:"+row1);
////		//System.out.println("col:"+col1);
////		int sbox1 = S0[row1][col1];
////		String sboxes = Integer.toBinaryString(sbox1);
////		//System.out.println("sbox1:"+sboxes);
////		if(sboxes.length() == 1){
////			sboxes = "0"+sboxes;
////		}
////		String row2String = eprk1array[0+4] + "" + eprk1array[3+4];
////		int row2 = Integer.parseInt(row2String, 2);
////		String col2String = eprk1array[1+4] + "" + eprk1array[2+4];
////		int col2 = Integer.parseInt(col2String, 2);
////		int sbox2 = S1[row2][col2];
////		String sbox2str = Integer.toBinaryString(sbox2);
////		if(sbox2str.length() == 1){
////			sbox2str = "0"+sbox2str;
////		}
////		sboxes += sbox2str;
////		//System.out.println("sbox2:"+sbox2str);
////		//System.out.println("sboxes:"+sboxes);
////		
////		String fk1 = performSwitch(p4, sboxes);
////		String left = left(ip);
////		//System.out.println("left:"+left);
////		fk1 = performExOr(left, fk1) + right;
////		//System.out.println("fk1:"+fk1);
//		
//		return "";
//	}

}
