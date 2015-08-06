
class Time {
    public static void delay( int msec ) {
    	// Pause thread for specified number of milliseconds
    	try {
    		Thread.sleep( msec );
    	} catch( InterruptedException e ) {
    		Thread.currentThread().interrupt();
    	}
    }
}