/*This monitor Allows mutually exlusive access when incrementing the 'numElvesThatNeedHelp' variable*/
public class ElfHelpMonitorMutex {

	boolean elfSeekingHelp = false;
	
	synchronized public void acquireMutex(){
		while(elfSeekingHelp){
			try {
				wait();
			} catch (InterruptedException e) {}
		}
		elfSeekingHelp = true;
		notify();
	}
	
	synchronized public void releaseMutex(){
		elfSeekingHelp = false;
		notify();
	}
}
