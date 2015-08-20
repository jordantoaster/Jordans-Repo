/*
 * This programs goal is to determine if theoritical brick sizes can be used to form a larger target brick
 * small bricks are off size [] each
 * large bricks are off size [][][][][] each
 * these sizes are set in stone and an n amount of each can be used to see if the target can be formed
 * Example - target = 6, [] + [][][][][] == true && [],[] + [][][][][] = true && [],[],[] + 0 = false
 */
public class BrickPuzzle {

	public boolean canCreateTargetSequence(int smallBricks, int largeBricks, int targetSize) {
		
		final int big = 5, small = 1;
		final int totalPossibleSequence = (big*largeBricks) + (small*smallBricks);
		int count = 0;
		int diff = 0;
		int total = smallBricks + largeBricks;
		
		//pre condition (is reaching target even possible?)
		if(totalPossibleSequence < targetSize){
			return false;
		} else {
			//loop for n amount of brick sections in total
			for (int i = 0; i < total; i++) {
				diff = targetSize - count;
				//if we can use 5 size blocks, give them preference, else use one sized blocks to add to count;
				if(diff > 5 && largeBricks != 0){
					count = count + big;
					largeBricks--;
				} else if (smallBricks != 0){
					count = count + small;
					smallBricks--;
				}
				
				//check if we have reached the target
				if(count == targetSize){
					return true;
				}
			}
		}
		
		return false;
	}
}
