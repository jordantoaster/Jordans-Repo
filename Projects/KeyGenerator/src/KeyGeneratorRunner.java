import javax.swing.SwingUtilities;

public class KeyGeneratorRunner {

	public static void main(String[] args) {
		KeyGeneratorRunner runner = new KeyGeneratorRunner();
		runner.runApp();
	}

	public void runApp() {
		//Ensures Thread safety with the GUI
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				KeyGenGui gui = new KeyGenGui();
			}
		});
	}
}
