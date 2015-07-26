package com.myawesomeapp.utility;

/*
 * A Class that constructs a POJO for use in Gson Conversion to Json
 * creates a string message and a true/false string
 * */
public class ResponseBase {
	  protected String feedback;
	  protected String success;

	  public ResponseBase(String feedback, String success){
	       this.feedback = feedback;
	       this.success = success;
	  }
	  
	  public String getFeedback(){
		  return feedback;
	  }
	  
	  public String getSuccess(){
		  return success;
	  }
}
