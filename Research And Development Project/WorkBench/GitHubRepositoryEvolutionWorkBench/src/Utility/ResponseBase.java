package Utility;

public class ResponseBase {
	  private String outcome;
	  private String message;

	  public ResponseBase(String outcome, String message){
	       this.outcome = outcome;
	       this.message = message;
	  }
	  
	  public String getOutcome(){
		  return outcome;
	  }
	  
	  public String getMessage(){
		  return message;
	  }
}