
public class WishListMonitorMutex {

	boolean elfGettingToy = false;
	
	synchronized public void acquireMutex(){
		while(elfGettingToy){
			try {
				wait();
			} catch (InterruptedException e) {}
		}
		elfGettingToy = true;
		notifyAll();
	}
	
	synchronized public void releaseMutex(){
		elfGettingToy = false;
		notifyAll();
	}
}
