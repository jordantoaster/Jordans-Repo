import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.Semaphore;


public class Q4 {
	
	/*Variable and Semaphore declarations*/
	static final int NUM_REINDEER = 9;
	static final int NUM_ELVES = 11;
	static final int WISHLIST_SIZE = 100;
	
	static int numToysTakenByAnElf = 0;
	static boolean isDelivered = false;
	static int[] problemGiftIndexes;
	static Random generator = new Random();
	static boolean consultSanta = false;
	static int elvesThatNeedHelp = 0;
	static boolean isElfQueueFull = false;
	static boolean smallerElfContingentAllowed = false;
	
	static SantaMonitor santaMonitor = new SantaMonitor();
	static ReindeerMonitor reindeerMonitor = new ReindeerMonitor();
	static ElfMonitor elfMonitor = new ElfMonitor();
	static WishListMonitorMutex wishlistMutex = new WishListMonitorMutex();
	static ElfHelpMonitorMutex elfHelpMutex = new ElfHelpMonitorMutex();
	
	public static void main(String[] args){
		initialise();
	}
	
	//Creates elf, deer and santa threads, then starts
	public static void initialise(){
		ArrayList<Thread> threadPool = new ArrayList<Thread>();
		problemGiftIndexes = getProblemGifts();
		int rudolphIndex = generator.nextInt(9);

		for (int idx = 0; idx < NUM_REINDEER; idx++) {
			if (idx != rudolphIndex) {
				threadPool.add(new Thread(new Reindeer(false)));
			} else {
				threadPool.add(new Thread(new Reindeer(true), "Rudolph"));
			}
		}

		for (int idx = 0; idx < NUM_ELVES; idx++) {
			threadPool.add(new Thread(new Elf()));
		}

		threadPool.add(new Thread(new Santa()));

		for (Thread t : threadPool) {
			t.start();
		}
	}
	
	/*Creates the ints that represent the 'problem' toys*/
	private static int[] getProblemGifts() {
		int[] damaged = new int[5];

		for (int idx = 0; idx < damaged.length; idx++) {
			damaged[idx] = generator.nextInt(100);
		}
		return damaged;
	}

}
