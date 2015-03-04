import java.util.ArrayList;


public class AlphaNumericLookup {
	
	int subIndex = 0;
	
	public int[] charToInt(char[] source){
		char[] find = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
		int[]hillSwap = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25};
		int[] subsitution = new int[source.length];
		
		for(int i = 0;i<source.length;i++){
			for(int j=0; j<find.length;j++){
				if(source[i] == find[j]){
					subsitution[subIndex] = hillSwap[j];
					subIndex++;
				}
			}
		}	
		return subsitution;	
	}
	
	public char[] intToChar(int[] source){
		char[] hillSwap = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
		int[]find = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25};
		char[] subsitution = new char[source.length];
		int subIndex = 0;
		
		for(int i = 0;i<source.length;i++){
			for(int j=0; j<find.length;j++){
				if(source[i] == find[j]){
					subsitution[subIndex] = hillSwap[j];
					subIndex++;
				}
			}
		}	
		return subsitution;	
	}
}
