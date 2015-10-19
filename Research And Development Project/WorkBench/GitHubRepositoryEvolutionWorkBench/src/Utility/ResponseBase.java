package Utility;

public class ResponseBase {
	  private String outcome;
	  private String message;
	  private String action;

	public ResponseBase(String outcome, String message, String action){
	       this.outcome = outcome;
	       this.message = message;
	       this.action = action;
	  }
	  
	  public String getOutcome(){
		  return outcome;
	  }
	  
	  public String getMessage(){
		  return message;
	  }
	  
	  public String getAction() {
		  return action;
	  }

	  public void setAction(String action) {
		  this.action = action;
	  }
}