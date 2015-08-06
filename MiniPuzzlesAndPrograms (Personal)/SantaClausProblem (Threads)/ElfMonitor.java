
public class ElfMonitor {
	private int numElfCompletedWork = 0;
	private boolean elfWriting = false;
	private int waitingWriter = 0;
	
	synchronized public void elfWrite(){
		waitingWriter++;
		while(elfWriting){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
		waitingWriter--;
		
		elfWriting = true;
		numElfCompletedWork++;
		elfWriting = false;

		notifyAll();
	}
	
	//Priority given to writing threads
	synchronized public int elfRead(){
		while(waitingWriter > 0 || elfWriting){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
		notifyAll();
		return numElfCompletedWork;
	}
	
	synchronized public void releaseElf(){
		while(waitingWriter > 0 || elfWriting){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
		
		numElfCompletedWork = 0;
		
		notifyAll();
	}
}
