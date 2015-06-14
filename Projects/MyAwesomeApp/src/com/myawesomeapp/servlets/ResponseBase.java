package com.myawesomeapp.servlets;

/*
 * A Class that constructs a POJO for use in Gson Conversion to Json
 * */
public class ResponseBase {
	  protected String feedback;
	  protected String success;

	  public ResponseBase(String feedback, String success){
	       this.feedback = feedback;
	       this.success = success;
	  }
}
