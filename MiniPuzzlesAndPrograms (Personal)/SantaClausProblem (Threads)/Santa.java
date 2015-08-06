public class Santa implements Runnable {

	//local variables used to track progress
	boolean isHarnessed = false;
	boolean toysComplete = false;
	int currentYear = 2014;

	public void run() {
		while (true) {
			
			System.out.println("\nCurrent year: " + currentYear++);
			
			while (!Q4.isDelivered) {
				
				//Santa waits until his 'attention' is acquired
				while(Q4.santaMonitor.readSantaStatus() == 0){Time.delay(100);}
				
				System.out.println("Santa is Awake");
				
				//Santa detects if an elf needs his assistance
				if(Q4.consultSanta){
					System.out.println("Santa Helps an elf");
				}
				
				//Harnesses reindeer if required, local var prevents backtracking into this method
				if(Q4.reindeerMonitor.reindeerRead() == 9 && !isHarnessed && !Q4.consultSanta){
					System.out.println("Santa harnesses Reindeer");
					isHarnessed = true;
				}
				
				//Checks if toys are complete and another thread is not using santa
				if(Q4.elfMonitor.elfRead() == 11 && !toysComplete && !Q4.consultSanta){
					System.out.println("Santa is aware the toys are completed, The elves can now rest");
					toysComplete = true;
				}
				
				//If the requirements are met, santa makes a delivery
				if(isHarnessed && toysComplete){
					Q4.isDelivered = true;
					System.out.println("Santa Makes a delivery");
				}
				
				//allows other threads to consult Santa
				Q4.consultSanta = false;				
				Q4.santaMonitor.releaseSanta();
			}
			
			//Once a delivery is made, Santa resets the program cycle
			isHarnessed = false;
			toysComplete = false;
			Q4.reindeerMonitor.releaseReindeer();
			Q4.smallerElfContingentAllowed = false;
			Q4.elfMonitor.releaseElf();
			Q4.numToysTakenByAnElf = 0;
			Q4.isDelivered = false;	
			Time.delay(200);
			
			System.out.println("Santa Goes Back To Sleep, christmas is over, Elves start producing toys");
		}
	}
}
