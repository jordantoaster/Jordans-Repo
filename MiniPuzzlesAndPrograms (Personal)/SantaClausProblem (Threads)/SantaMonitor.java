
public class SantaMonitor {
	//getting attention is represented by a binary 0 or 1
	private int santasAttention = 0;
	boolean writingToSanta = false;
	
	synchronized public void acquireSanta(){
		while(santasAttention == 1){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
		writingToSanta = true;
		santasAttention++;	
		writingToSanta = false;
		
		notifyAll();
	}
	
	synchronized public void releaseSanta(){
		while(writingToSanta){
			try {
				wait();
			} catch (InterruptedException e) {}
		}	
	
		santasAttention--;	
		notifyAll();
	}
	
	synchronized public int readSantaStatus(){
		while(writingToSanta){
			try {
				wait();
			} catch (InterruptedException e) {}
		}
		
		notifyAll();
		return santasAttention;
	}
}
