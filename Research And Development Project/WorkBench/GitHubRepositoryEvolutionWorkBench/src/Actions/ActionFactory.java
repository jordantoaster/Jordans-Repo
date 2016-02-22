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
		
		if(input.equals("storeContributions")){
			return new StoreContributionAction();
		}
		
		if(input.equals("storeGeneric")){
			return new StoreGenericAction();
		}
		if(input.equals("stats")){
			return new StatsAction();
		}
		if(input.equals("laws")){
			return new LawsAction();
		}
		
		return new NoAction();
	}
}
