import java.util.Random;

public class Hill {

	public static void main(String[] args) {
		
		//sets plain text and initialise cipher array
		String plainText = "pay more money";
		
		int[][] m = {
	            {17, 17,5},
	            {21,18,21},
	            {2,2,19}};
		
		plainText = plainText.replaceAll("\\s+","");
		
		Run(plainText,m,plainText.length() / m[0].length);
	}

	public static void Run(String pT, int[][] mask,int totalIteration){	
		int[] vector = new int[pT.length()];
		char[] ch = pT.toCharArray();
		int[] hillSubsitute = new int[ch.length];
		char[] cipher = new char[ch.length];
		
		//translate the original string from letters to numbers eg a=0
		AlphaNumericLookup lookup = new AlphaNumericLookup();
		vector = lookup.charToInt(ch);
				
		int hillIndex = 0;
		int weight = 0;
		int[] letterSet = new int[mask[0].length];
		
		for(int i=0;i<totalIteration;i++){
			for(int j=0;j<mask.length;j++){
				for(int k =0;k<mask[0].length;k++){
					letterSet[k] = mask[j][k] * vector[k+weight];
				}
				for(int m = 0;m<letterSet.length;m++){
					hillSubsitute[hillIndex] += letterSet[m];
				}
				hillSubsitute[hillIndex] = hillSubsitute[hillIndex]%26; 
				hillIndex++;
			}
			weight += mask[0].length;
		}
		
		cipher = lookup.intToChar(hillSubsitute);
	    
		System.out.println("Cipher Text");
	    for(int i =0;i<cipher.length;i++){
	    	System.out.print(cipher[i] + " : ");
	    }				
	}
	
	//Utility/test function
	public static int[][] maskGenerator(int[][] m){
		Random rand = new Random();
		for(int r = 0; r<m.length;r++)
		{
			for(int c = 0; c<m.length;c++)
			{		
				m[r][c] = rand.nextInt(30);
			}
		}
		
		return m;
	}
}
