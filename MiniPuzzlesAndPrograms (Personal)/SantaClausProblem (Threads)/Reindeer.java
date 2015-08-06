public class Reindeer implements Runnable {

	boolean isRudolf = false;
	//Used to set one of the reindeer as Rudolf
	public Reindeer(boolean bool) {
		isRudolf = bool;
	}

	public void run() {
		while (true) {
			//Used to count the reindeer who have returned
			Q4.reindeerMonitor.reindeerWrite();
			
			//Rudolf waits until all Reindeer have returned, then informs santa
			if(isRudolf){
				while(Q4.reindeerMonitor.reindeerRead() !=9 ){Time.delay(100);} Time.delay(100);

				System.out.println("Reindeer have returned from Holiday");
				
				Q4.santaMonitor.acquireSanta();
			}
			
			//Reindeer wait until Santa indicates they can go on holiday
			while(Q4.reindeerMonitor.reindeerRead() !=0 ){Time.delay(100);}

			//Reindeer go on holiday
			if(isRudolf)System.out.println("Reindeer are going on holiday");
			Time.delay(800);
		}
	}
}
