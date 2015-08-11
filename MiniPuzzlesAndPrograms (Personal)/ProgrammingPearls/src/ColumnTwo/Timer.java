package ColumnTwo;

public class Timer implements Runnable {
	
	private long startTime = 0;
	private long stopTime = 0;
	
	public void startTimer(){
	    this.startTime = System.currentTimeMillis();
	}
	
	public void endTimer(){
	    this.stopTime = System.currentTimeMillis();
	}
	
	public long getDuration(){
		return this.stopTime - this.startTime;
	}

	@Override
	public void run() {
		startTimer();
	}
}
