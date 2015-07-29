package com.myawesomeapp.mainapp.ServletControllers;
 
import java.io.IOException; 
import java.util.HashMap;
import java.util.Map;

import javax.crypto.EncryptedPrivateKeyInfo;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.myawesomeapp.utility.EncryptionManager;
import com.myawesomeapp.utility.ResponseBase;
import com.myawesomeapp.mainapp.dao.UserDaoImpl;
import com.myawesomeapp.utility.*;

 
/*
 * A java controller class that deals with ajax requests from the login page
 * */

@WebServlet(
        description = "Login Servlet", 
        urlPatterns = { "/LoginServlet" })
public class LoginServletController extends HttpServlet {

	private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
       	EncryptionManager encrypt = new EncryptionManager();
       	
    	//convert input json data to a map
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
			       	
		//encrypt password before comparing
		String passwordEncrypted = encrypt.encrypt(inputMap.get("password").toString());
				
		//check which operation is required
		if(inputMap.containsValue("login")){			
			performLoginProcess(inputMap, response);			 
		} else {
			performRegProcess(inputMap, response, passwordEncrypted);			
		}
    }

	private void performRegProcess(Map<String, Object> inputMap,
			HttpServletResponse response, String passwordEncrypted) throws IOException {
		
		ResponseBase JsonResponse;
       	Gson gson = new Gson();
    	UserAccessValidator check = new UserAccessValidator(); 
		
		boolean isInputValid = check.validateRegDetails(inputMap.get("username").toString(),inputMap.get("password").toString(), inputMap.get("confirm").toString());

		if(!isInputValid){   
        	
			JsonResponse = new ResponseBase("User details do not meet the required standards", "false");
			String json = gson.toJson(JsonResponse); 	
			response.getWriter().write(json); 
    	
		} else {
			UserDaoImpl uDao = new UserDaoImpl();
    	
			boolean isReg = uDao.insertUser(inputMap.get("username").toString(),passwordEncrypted, "");           	
			
			if(isReg){
				JsonResponse = new ResponseBase(inputMap.get("username").toString(), "true");
				String json = gson.toJson(JsonResponse); 	
				response.getWriter().write(json); 
			} else {
				JsonResponse = new ResponseBase("user details already on the system", "false");
				String json = gson.toJson(JsonResponse); 	
				response.getWriter().write(json); 
			}
		}
		
	}

	private void performLoginProcess(Map<String, Object> inputMap, HttpServletResponse response) throws IOException {
		
		ResponseBase JsonResponse;
       	Gson gson = new Gson();
    	UserAccessValidator check = new UserAccessValidator(); 
		
		/*Returns a boolean verifying is a user has passed security checks*/
		boolean isInputValid = check.validateLoginDetails(inputMap.get("username").toString(),inputMap.get("password").toString());
        
		/*If sequence determines if the User details are valid a each stage. A Java object is constructed
		 * with relevant values and sent back to client via ajax*/
		if(!isInputValid){   
    	
			JsonResponse = new ResponseBase("User details do not meet the required standards", "false");
			String json = gson.toJson(JsonResponse); 	
			response.getWriter().write(json); 
    	
		} else {     
    	
			UserDaoImpl uDao = new UserDaoImpl();
			boolean isOnSystem = uDao.readAndCompare(inputMap.get("username").toString(),inputMap.get("password").toString()); 
    	
			if(isOnSystem){
    		
				//append user id for future reference
				JsonResponse = new ResponseBase(inputMap.get("username").toString(), "true");
				String json = gson.toJson(JsonResponse); 	
				response.getWriter().write(json);  
        	
			} else {
    		
				JsonResponse = new ResponseBase("User details are not on the system", "false");
				String json = gson.toJson(JsonResponse); 	
				response.getWriter().write(json);             	
			}
		} 		
	}
 
}