
public class ReindeerMonitor {
	private boolean writeReindeerReturned = false;
	private int reindeerReturned = 0;
	private int waitingWriter = 0;
	
	synchronized public void reindeerWrite(){
		waitingWriter++;
		while(writeReindeerReturned){
			try {
				wait();
			} catch (InterruptedException e) {}
		}		
		waitingWriter--;
		
		writeReindeerReturned = true;
		reindeerReturned++;
		writeReindeerReturned = false;
		notifyAll();
	}
	
	//Priority is given to the writing threads
	synchronized public int reindeerRead(){
		while(waitingWriter > 0 || writeReindeerReturned){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
		notifyAll();
		return reindeerReturned;
	}
	
	//Used to atomically reset the yearly cycle
	synchronized public void releaseReindeer(){
		
		while(waitingWriter > 0 || writeReindeerReturned){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
		
		reindeerReturned = 0;
	}
}
