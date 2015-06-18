package com.myawesomeapp.mainapp.ServletControllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.myawesomeapp.utility.NumericChecker;
import com.myawesomeapp.utility.ResponseBase;
import com.myawesomeapp.mainapp.dao.UserDaoImpl;

/**
 * Servlet implementation class ProfileServletController
 */
@WebServlet(description = "Profile Servlet",
		   urlPatterns = { "/ProfileServlet" })

public class ProfileServletController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;	
	ResponseBase jsonResponse;
	Gson gson = new Gson();

    //used to populate boxes by taking uid from request and taking data from dao
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		UserDaoImpl dao = new UserDaoImpl();
		String jsonResponseObject = dao.getUserDetails(request.getParameter("input"));
		
		String jsonReponse = gson.toJson(jsonResponseObject);
		
    	response.getWriter().write(jsonReponse); 
	}

	//Used to take in updated balance from request and send it to the dao
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				
		//stack overflow conversion solution
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
			
			if(inputMap.containsValue("updateFunds")){				
				updateFunds(inputMap, response);
			} else if(inputMap.containsValue("changeDetails")) {
				changeDetails(inputMap, response);
			}
	}
	
	private void changeDetails(Map<String, Object> inputMap,
			HttpServletResponse response) throws IOException {
		
		
		if(!inputMap.containsValue("") && !inputMap.containsValue(null) && 
			inputMap.get("password").toString().equals(inputMap.get("passwordValidate").toString())){
						
			UserDaoImpl dao = new UserDaoImpl();
			boolean isUpdated = dao.updateUserDetails(inputMap.get("username").toString(), inputMap.get("password").toString(), inputMap.get("uid").toString());

			if(isUpdated){
				jsonResponse = new ResponseBase("Details Updated Successfully", "true");
		       	String json = gson.toJson(jsonResponse); 	
		       	response.getWriter().write(json); 
			} else {
				jsonResponse = new ResponseBase("An Error Occurred", "false");
		       	String json = gson.toJson(jsonResponse); 	
		       	response.getWriter().write(json); 
			}
			
		} else {
			
			//if input box is detected to be empty	
			jsonResponse = new ResponseBase("The input feild cannot be empty and both passwords need to be the same", "false");
	       	String json = gson.toJson(jsonResponse); 	
	       	response.getWriter().write(json); 
		}

	}

	public void updateFunds(Map<String, Object> inputMap, HttpServletResponse response) throws IOException{
		
    	NumericChecker numCheck = new NumericChecker();
		UserDaoImpl dao = new UserDaoImpl();
		
		if(!inputMap.containsValue("") && !inputMap.containsValue(null) && numCheck.checkNumeric((String)inputMap.get("amount"))){

		boolean result = dao.updateBalance(inputMap.get("amount").toString(), inputMap.get("user").toString());
				
			if(result){				
				//if DB is updated correctly
				jsonResponse = new ResponseBase("sucessfully updated balance", "true");
				String json = gson.toJson(jsonResponse); 	
				response.getWriter().write(json); 
        	} else {			
        		//if something bad happens in the DB
        		jsonResponse = new ResponseBase("balance could not be updated", "false");
        		String json = gson.toJson(jsonResponse); 	
        		response.getWriter().write(json);
        	
        	}
		}  else {	
			
		//if input box is detected to be empty	
		jsonResponse = new ResponseBase("The input feild cannot be empty or contain letters", "false");
       	String json = gson.toJson(jsonResponse); 	
       	response.getWriter().write(json); 
       	
		}
	}

}
