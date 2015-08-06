package assignment;
import java.util.Timer;
import java.awt.*;
import java.awt.event.*;

import javax.swing.*;
import javax.swing.border.Border;

import java.net.*;
import java.io.*;
import java.util.Random;
import java.util.Arrays; 
import java.util.TimerTask;

public class Client extends JFrame{
	// client socket	
   	Socket socket;
   	// output stream - data sent to the server will be written to this stream
	ObjectOutputStream clientOutputStream;
   	// input stream - data sent by the server will be read from this stream
	ObjectInputStream clientInputStream;

	// variables for the GUI components of the game 
	Container c; 
	JButton logonButton, registerButton, registerUserButton, yesButton, noButton, startButton, backButton;
	ButtonHandler bHandler;
   	JPanel buttonPanel, logonFieldsPanel, logonButtonPanel, registerButtonPanel, registerFieldsPanel,outputPanel;
   	JLabel usernameLabel, passwordLabel, confirmPasswordLabel;
   	JTextArea outputArea, playerArea, broadcastArea;
   	JTextField username;
   	JPasswordField password, confirmPassword;
   	int attempts = 0;
   	Timer timer = new Timer();
   	long time = 60000;
		
   	public static void main(String args[])
   	{	
   		//thread runs the server
        Thread thread = new Thread(myRunnable);
        thread.start();
   		
		//give server time to run
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
   		
   	   	Client loginClient = new Client();
   		loginClient.getConnections();
	}
   	
	public Client()
	{	super("Client");
		addWindowListener
		(	new WindowAdapter()
			{	public void windowClosing(WindowEvent e)
				{	System.exit(0);
				}
			}
		);
		
		// create and add GUI components
		c = getContentPane(); 
		c.setLayout(new BorderLayout());  
		
        showLogin(false, false);
	}
	
	void showLogin(boolean wipePanel, boolean lockedOutOfSystem){
      	/* the initial GUI will provide a text field and password field 
   	   to enable the user to enter their username and password and 
   	   attempt to logon to the game system */
		
		if(wipePanel)
			c.removeAll();
   	   
		// GUI components for the username
		logonFieldsPanel = new JPanel(); 
		logonFieldsPanel.setLayout(new GridLayout(2,2,5,5));
		usernameLabel = new JLabel("Enter Username: ");
		logonFieldsPanel.add(usernameLabel);
		username = new JTextField(10);
		logonFieldsPanel.add(username);
		
		// GUI components for the password
		passwordLabel = new JLabel("Enter Password: ");
		logonFieldsPanel.add(passwordLabel);
		password = new JPasswordField(10);
		logonFieldsPanel.add(password);
		c.add(logonFieldsPanel,BorderLayout.CENTER);
		
		// panel for the logon button
		logonButtonPanel = new JPanel();
		logonButton = new JButton("logon");
		bHandler = new ButtonHandler();
		logonButton.addActionListener(bHandler);
		logonButtonPanel.add(logonButton);
		
		registerButton = new JButton("register");
		bHandler = new ButtonHandler();
		registerButton.addActionListener(bHandler);
		logonButtonPanel.add(registerButton);
		
		c.add(logonButtonPanel, BorderLayout.SOUTH);
		
		if(lockedOutOfSystem){
			registerButton.setEnabled(false);
			logonButton.setEnabled(false);
			clearFields();
		}
		
		setSize(300,125);
		setResizable(false);
		setVisible(true);
		
		//Positions GUI to centre of the screen
		Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();
		this.setLocation(dim.width/2-this.getSize().width/2, dim.height/2-this.getSize().height/2);
		
		timer.schedule(new TimerTask() {
			  @Override
			  public void run() {
				  registerButton.setEnabled(false);
				  logonButton.setEnabled(false);
			  }
			}, time);
	}
	
	void showRegister(){
		c.remove(logonFieldsPanel);
		c.remove(logonButtonPanel);
		
      	registerFieldsPanel = new JPanel(); 
      	registerFieldsPanel.setLayout(new GridLayout(3,2,5,5));
		
      	usernameLabel = new JLabel("Username: ");
		registerFieldsPanel.add(usernameLabel);
		username = new JTextField(10);
		registerFieldsPanel.add(username);
		
		passwordLabel = new JLabel("Password: ");
		registerFieldsPanel.add(passwordLabel);
		password = new JPasswordField(10);
		registerFieldsPanel.add(password);
		
		confirmPasswordLabel = new JLabel("Confirm Password: ");
		registerFieldsPanel.add(confirmPasswordLabel);
		confirmPassword = new JPasswordField(10);
		registerFieldsPanel.add(confirmPassword);
		
		c.add(registerFieldsPanel,BorderLayout.CENTER);
		
		// panel for the logon button
		registerButtonPanel = new JPanel();
		
		registerUserButton = new JButton("register");
		bHandler = new ButtonHandler();
		registerUserButton.addActionListener(bHandler);
		registerButtonPanel.add(registerUserButton);
		
		c.add(registerButtonPanel, BorderLayout.SOUTH);
		
		setSize(300,160);
		setResizable(true);
		setVisible(true);
		
		//Positions GUI to centre of the screen
		Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();
		this.setLocation(dim.width/2-this.getSize().width/2, dim.height/2-this.getSize().height/2);
	}

	
	void setUpGame(boolean loggedOn, String mess)
	{	// remove iniial GUI components (textfield, password field, logon button)
		c.remove(logonFieldsPanel);
		c.remove(logonButtonPanel);
		
		// if the player has not logged on an error message will be displayed 
		if(!loggedOn)
		{	 
			outputPanel = new JPanel();
			outputPanel.setBackground(Color.WHITE);
			// add text area	
			outputArea = new JTextArea(12,30);
			backButton = new JButton("back");
			backButton.addActionListener(bHandler);
			backButton.setSize(80, 30);
			backButton.setText("Click here to go back to the log in screen");
			outputArea.setEditable(false);
			outputArea.setLineWrap(true);
			outputArea.setWrapStyleWord(true);
			outputArea.setFont(new Font("Verdana", Font.BOLD, 11));
			// add message to text area
			outputArea.setText(mess);
			outputPanel.add(outputArea);
			outputPanel.add(new JScrollPane(outputArea));	
			outputPanel.add(backButton);
			c.add(outputPanel, BorderLayout.CENTER);
			
			setSize(375,300);
		}
		else
		{	
		}
		setResizable(false);
		setVisible(true);
	}
	
	void sendRegistrationDetails(){
		try
		{	// get username from text field 
			String uname = username.getText();
			// get password from password field 
			String pword = new String (password.getPassword());
			
			// tell server we are registering 
			clientOutputStream.writeObject("register");
			// send username to server 
			clientOutputStream.writeObject(uname);
			// send password to server
			clientOutputStream.writeObject(pword);
		}
		catch(IOException e) // thrown by methods writeObject
		{	System.out.println(e);
			System.exit(1);
		}
	}
	
	void sendLoginDetails()
	{	try
		{	// get username from text field 
			String uname = username.getText();
			// get password from password field 
			String pword = new String (password.getPassword());
			
			// tell server we are logging in
			clientOutputStream.writeObject("login");
			// send username to server 
			clientOutputStream.writeObject(uname);
			// send password to server
			clientOutputStream.writeObject(pword);
			
			//only increment once data is been sent
			attempts++;
		}
		catch(IOException e) // thrown by methods writeObject
		{	System.out.println(e);
			System.exit(1);
		}
	}

	void addOutput(String s)
	{	// add a message to the player text output area
		//playerArea.append(s + "\n");
		//playerArea.setCaretPosition(playerArea.getText().length());
		
		JOptionPane.showMessageDialog(null, s);
	}
	
	void addBroadcast(String s)
	{	// add a message to the broadcast text output area
		broadcastArea.append(s + "\n");
		broadcastArea.setCaretPosition(broadcastArea.getText().length());
	}
	
	void getConnections()
	{	try
		{	// initialise a socket and get a connection to server
			socket = new Socket(InetAddress.getLocalHost(), 6000);
			// get input & output object streams
			clientOutputStream = new ObjectOutputStream(socket.getOutputStream());
			clientInputStream = new ObjectInputStream(socket.getInputStream());
			
			/* create a new thread of P7_ClientThread, sending input  
			   stream variable as a parameter */
			ClientThread t = new ClientThread(clientInputStream);
			// start thread - execution will begin at method run
			t.start();
		}
		catch(UnknownHostException e) // thrown by method getLocalHost
		{	System.out.println(e);
			System.exit(1); 
		}
		catch(IOException e) // thrown by methods ObjectOutputStream, ObjectInputStream
		{	System.out.println(e);
			System.exit(1); 
		} 
	}
	
	void sendDice()
	{	try
		{	// an object of class Random is required to create random numbers for the dice
			Random randomNumbers = new Random();
			// get random numbers and store in an array
			int dice[] = new int[3];
			for(int i = 0; i < dice.length; i++)
        		dice[i] = 1 + randomNumbers.nextInt(6);
        	// sort array	
			Arrays.sort(dice);
			// send the dice values to the server
			clientOutputStream.writeObject(dice);
		}
		catch(IOException e) // thrown by method writeObject
		{	System.out.println(e);
			System.exit(1);
		}
	}
	
	void sendMessage(String message)
	{	try
		{	// send a message (i.e. "yes" or "no") to the server
			clientOutputStream.writeObject(message);
		}
		catch(IOException e) // thrown by method writeObject
		{	System.out.println(e);
			System.exit(1);
		}
	}

	void closeStreams()
	{	try
      	{	// close input stream 
      		clientOutputStream.close();
      		// close output stream 
			clientInputStream.close();
			// close socket 
			socket.close();
		}
		catch(IOException e) // thrown by method close
		{	System.out.println(e);
			System.exit(1); 
		}
	}
	
/* -----------------------------------------------------------------------
 	beginning of class ClientThread
   ----------------------------------------------------------------------- */	
    
    private class ClientThread extends Thread 
	{	ObjectInputStream threadInputStream;

		public ClientThread(ObjectInputStream in)
		{	// initialise input stream
			threadInputStream = in;
		}
	
		
		public void run()
		{	// when method start is called thread execution will begin in this method  
  		    try
			{	/* read Boolean value sent by server - it is converted to
			  	   a primitive boolean value */
				boolean loggedOn = (Boolean)threadInputStream.readObject(); 

				if(!loggedOn)
				{ 	// call method to close input & output streams & socket
					closeStreams();
					// call method to display message
					setUpGame(loggedOn, "Logon unsuccessful");	
				}
				else
				{	// if the client is logged on read the game rules 
					String rules = (String)threadInputStream.readObject();
					// call method to set up game GUI
					setUpGame(loggedOn, rules);
						
					String message;
					boolean roundOver = false;
					// while game is in play
					while(!roundOver)
					{	// read a message from the server
						message = (String)threadInputStream.readObject();
						/* if the first character of the message is 'B' this 
						   is a message for the broadcast text area */
						if(message.charAt(0) == 'B')
							/* remove the first character of the message and 
							   add to broadcast output area */
							addBroadcast(message.substring(1, message.length()));
						else
							// add message to the player text area
							addOutput(message);
							
						/* if the last character in the message is '?' 
						   enable the yes button and the no button */
						if(message.charAt(message.length()-1) == '?')
						{	yesButton.setEnabled(true);
							noButton.setEnabled(true);
						}
					}
					// call method to close input & output streams & socket
					closeStreams();
				}
			}
			catch(IOException e) // thrown by method readObject
			{	System.out.println(e);
				System.exit(1);
			}	
			catch(ClassNotFoundException e) // thrown by method readObject
			{	System.out.println(e);
				System.exit(1);
			}
		}
	} // end of class P7_ClientThread
    
    private boolean checkAttempts(){
    	if(attempts == 3)
    		return true;
    	
    	return false;
    }
    
    private boolean checkDetailsSecureAndValid(boolean isRegister){   	
    	username.setBorder(javax.swing.BorderFactory.createEmptyBorder());
    	password.setBorder(javax.swing.BorderFactory.createEmptyBorder());
    	
    	String regex = "(?=.*?\\d)(?=.*?[a-zA-Z])(?=.*?[^\\w]).{8,}";
    	
    	String user = username.getText();
    	String pass = new String (password.getPassword());
    	String confirm = "";
    	
    	if(isRegister){
    		confirm = new String (confirmPassword.getPassword());
    	}
    	
    	boolean nameLength = false;
    	boolean passLength = false;
    	boolean letterPasswordSymbol = false;
    	boolean passUsernameMatch = false;
    	boolean errorFound = false;
    	boolean match = true;
    	boolean empty = false;
    	
        Border border = BorderFactory.createLineBorder(Color.RED, 2);
        
        if(user.equals("") || pass.equals("")){
        	errorFound = true;
        	empty = true;
			JOptionPane.showMessageDialog(null, "please complete all fields");
			if(user.equals(""))username.setBorder(border);
			if(pass.equals(""))password.setBorder(border);
        }
        
        if(pass.equals(user) && !errorFound){
        	passUsernameMatch = true;
        	errorFound = true;
			JOptionPane.showMessageDialog(null, "password and username cannot match");
			password.setBorder(border);
			username.setBorder(border);
        } 
    	
    	if(user.length() > 5 && !errorFound){
    		nameLength = true;
    	} else {
    		if(errorFound == false){
    			errorFound = true;
    			JOptionPane.showMessageDialog(null, "usernames need to be at least six characters");
    			username.setBorder(border);
    		}
    	}
    	
    	if(pass.length() > 5 && !errorFound){
    		passLength = true;
    	} else {
    		if(errorFound == false){
    			errorFound = true;
    			JOptionPane.showMessageDialog(null, "Passwords need to be at least six characters");
    			password.setBorder(border);
    			confirmPassword.setBorder(border);
    		}
    	}
    	
    	if(pass.matches(regex)&& !errorFound)
    		letterPasswordSymbol = true;
    	else{
    		if(errorFound == false){
    			errorFound = true;
    			JOptionPane.showMessageDialog(null, "Passwords need to have a letter, symbol and number");
    			password.setBorder(border);
    			
    			if(isRegister){
    				confirmPassword.setBorder(border);
    			}
    		}
    	}

    	if(isRegister){
    		if(empty){
    			if(confirm.equals("")){
    				confirmPassword.setBorder(border);	
    			}else{
    				confirmPassword.setBorder(null);
    			}
    		}
    		
    		if(!errorFound)
    		{
    			if(confirm.equals("")){
    				errorFound = true;
    				JOptionPane.showMessageDialog(null, "Please complete all fields");
    				confirmPassword.setBorder(border);	
    			}
    			
    			if(!confirm.equals(pass)){
    				match = false;
    				errorFound = true;
    				JOptionPane.showMessageDialog(null, "Passwords need to match");
    				password.setBorder(border);
    				confirmPassword.setBorder(border);	
    			}
    		}
    	}
    		
    	if(nameLength && passLength && letterPasswordSymbol && !passUsernameMatch && match){
    		return true;
    	}
    	return false;
    }
    
    public void clearFields(){
    	username.setText("");
    	password.setText("");
    }
   
   	// beginning of class ButtonHandler - inner class for event handling
	private class ButtonHandler implements ActionListener
	{	
		public void actionPerformed(ActionEvent e)
		{	if(e.getSource() == logonButton) {
				boolean secureAndValid = checkDetailsSecureAndValid(false);

				if(secureAndValid){
					sendLoginDetails();
				} else {
					clearFields();
				}
				
			}
			else if(e.getSource() == registerButton){	
				showRegister();	
				}
			else if(e.getSource() == registerUserButton){
				boolean secureAndValid = checkDetailsSecureAndValid(true);
				if(secureAndValid){
					//send reg details to server
					sendRegistrationDetails();
					getConnections();
					showLogin(true, false);
				} else {
					clearFields();
				}
			}
			else if(e.getSource() == backButton){
				boolean blocked = checkAttempts();
				
				if(!blocked){
					//need to reset the socket to allow another attempt
					getConnections();
					showLogin(true, false);
				} else {
					//could send an email? or show a captcha security code? you are not a robot thing.
					JOptionPane.showMessageDialog(null, "you have made three attempts to log in, your are now locked out of the system");
					showLogin(true, true);
				}
				
			}
				else
				{ 	/* if the "yes" or "no" buttons have been clicked disable 
					   both buttons */
					yesButton.setEnabled(false);
					noButton.setEnabled(false);
					/* if the "yes" button was clicked call method sendMessage 
					   with parameter "yes" */	
					if(e.getSource() == yesButton)
						sendMessage("yes");
					else
						/* if the "no" button was clicked call method sendMessage 
					       with parameter "no" */
						sendMessage("no");
				}
			}	
	}  // end of class ButtonHandler  
	
	static Runnable myRunnable = new Runnable(){
	    public void run(){
	    	String p[] = null;
	   		Server.main(p);
	    }
	  };
} // end of class P7_Client


	