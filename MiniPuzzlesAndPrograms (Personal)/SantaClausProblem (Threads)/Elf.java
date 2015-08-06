
public class Elf implements Runnable{

	//Local variable that compares against problem indexes
	int toyTicket = 0;
	
	public void run() {
		while(true){
			while(Q4.numToysTakenByAnElf < Q4.WISHLIST_SIZE){
				
				//Atomically increment the wish list
				Q4.wishlistMutex.acquireMutex();
				
				if(Q4.numToysTakenByAnElf < Q4.WISHLIST_SIZE){
					toyTicket = Q4.numToysTakenByAnElf;
					Q4.numToysTakenByAnElf++;
				}
				
				Q4.wishlistMutex.releaseMutex();
								
				//Checks if santas consultation is required
				for(int idx = 0; idx < Q4.problemGiftIndexes.length; idx++) {
					if (toyTicket == Q4.problemGiftIndexes[idx]) {
							
						Q4.elfHelpMutex.acquireMutex();			
						
						//if the queue is full wait before incrementing
						while(Q4.isElfQueueFull){Time.delay(100);}
						
						Q4.elvesThatNeedHelp++;
							
						//determines if a set of elves can consult santa
						if(Q4.elvesThatNeedHelp == 3){
							Q4.isElfQueueFull = true;
						} else if(Q4.elvesThatNeedHelp == 2 && Q4.smallerElfContingentAllowed){
							Q4.isElfQueueFull = true;
						}
						Q4.elfHelpMutex.releaseMutex();																		

						//wait until three need help or 98 of the toys are completed in this scenario.
						while(!Q4.isElfQueueFull){
								Time.delay(100);
							}

						Time.delay(100);

						//elves still have to poll santa one at a time
						Q4.santaMonitor.acquireSanta();
						Q4.consultSanta = true;

						Q4.elvesThatNeedHelp--;
						
						//When santa has consulted with each elf, the queue is reset and the next group can be smaller
						if(Q4.elvesThatNeedHelp == 0){
							Q4.smallerElfContingentAllowed = true;
							Q4.isElfQueueFull = false;
						}
					}
				}
				
				//elf Works on the toy...
				Time.delay(100);	
			}

			//Used to 'queue' elves who have completed working on toys
			Q4.elfMonitor.elfWrite();
				
			//once all elves are done, call santa
			if(Q4.elfMonitor.elfRead() == 11){
				Q4.santaMonitor.acquireSanta();
			}
				
			//Elves rest until santa resets the cycle
			while(Q4.elfMonitor.elfRead() != 0)
			{
				Time.delay(100);
			}		
			Time.delay(800);
		}
	}
}
