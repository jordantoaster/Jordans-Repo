package Actions;

/*
 * Implements the Factory design pattern
 * */
public class ActionFactory {
	public static Action getAction(String input){
		
		System.out.println(input);
		
		if(input.equals("login")){
			return new LoginAction();
		}
		
		if(input.equals("register")){
			return new RegisterAction();
		}
		
		if(input.equals("storeContribution")){
			return new StoreContributionAction();
		}
		
		if(input.equals("storeCommits")){
			return new StoreCommitAction();
		}
		
		return new NoAction();
	}
}
