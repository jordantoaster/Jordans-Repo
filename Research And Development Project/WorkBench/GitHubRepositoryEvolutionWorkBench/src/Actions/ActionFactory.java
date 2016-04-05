/**
 * @author jordann
 *
 * Description - Implementation of the factory design pattern - returns an instantiated class based upon the input - each performing different actions
 */


package Actions;

public class ActionFactory {
	
	public static Action getAction(String input){
				
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
		if(input.equals("logout")){
			return new LogoutAction();
		}
		if(input.equals("export")){
			return new ExportAction();
		}
		if(input.equals("import")){
			return new ImportAction();
		}
		if(input.equals("clear")){
			return new ClearAction();
		}
		
		return new NoAction();
	}
}
