import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.swing.*;

public class KeyGenGui extends JFrame {
	
	//instance variables for the GUI components
	private JPanel KeyPanel = new JPanel();
	private JLabel KeyLabel = new JLabel("Software Key");
	private JTextField KeyTextBox = new JTextField();
	private JTextField InputTextBox = new JTextField();
	private JButton GenerateKeyButton = new JButton("Click to generate Key");
	private JButton ValidationButton = new JButton("Validate Key");
	
	public KeyGenGui() {
		createView();
	}

	public void createView() {
		//Jframe is extended so I can do basic set up like this
		this.setTitle("Key Generator");
		this.setSize(400, 300);
		this.setLocationRelativeTo(null);
		this.setLayout(new BorderLayout());
		
		//create a panel with a layout and add to the frame
		KeyPanel.setBackground(Color.WHITE);
		KeyPanel.setLayout(new GridBagLayout());
		this.add(KeyPanel);

		//object which allows user to adjust the layout of the gridbag
		GridBagConstraints layoutConstraints = new GridBagConstraints();

		layoutConstraints.fill = GridBagConstraints.HORIZONTAL;
		//these two deal influence the position of components
		//ie gridy = 1 is lower down than gridy = 0
		//gridx = 0 is to the left while gridx = 1 is to the right
		layoutConstraints.gridx = 0;
		layoutConstraints.gridy = 0;
		//adds 'padding/margin' to the component
		layoutConstraints.insets = new Insets(2, 35, 0, 0);
		//add component while also passes in constraints
		KeyPanel.add(KeyLabel, layoutConstraints);

		//overrides some of the constraints
		layoutConstraints.insets = new Insets(2, 0, 0, 0);
		layoutConstraints.gridy = 1;
		KeyPanel.add(KeyTextBox, layoutConstraints);

		layoutConstraints.insets = new Insets(10, 0, 0, 0);
		layoutConstraints.gridy = 2;
		GenerateKeyButton.setFocusPainted(false);
		KeyPanel.add(GenerateKeyButton, layoutConstraints);
		
		layoutConstraints.insets = new Insets(50, 0, 0, 0);
		layoutConstraints.gridy = 3;
		KeyPanel.add(ValidationButton, layoutConstraints);
		
		layoutConstraints.insets = new Insets(10, 0, 0, 0);
		layoutConstraints.gridy = 4;
		KeyPanel.add(InputTextBox, layoutConstraints);

		//adds an action listener to the button
		GenerateKeyButton.addActionListener(new ButtonActionKey());
		
		ValidationButton.addActionListener(new ButtonActionValidator());

		showGui();
	}

	public void showGui() {
		setVisible(true);
	}

	//Inner class that listens for input on the generate key button
	//once a click is detected the key is generated and set to the text feild
	private class ButtonActionKey implements ActionListener {
		KeyGenerator keyGen = new KeyGenerator();
		public void actionPerformed(ActionEvent event) {
			KeyTextBox.setText(keyGen.createKey());
		}
	}
	
	private class ButtonActionValidator implements ActionListener {
		public void actionPerformed(ActionEvent event) {
			
			//gets the user input
			String userKey = InputTextBox.getText();
			
			//passes input to validator
			KeyValidator validator = new KeyValidator(userKey);
			
			try {
				boolean isValidKey = validator.validKey();
				
				//changes input box color dependent on result
				if(isValidKey == true){
					InputTextBox.setBackground(Color.GREEN);
				} else {
					InputTextBox.setBackground(Color.RED);
				}
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
