package com.myawesomeapp.servlets;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class ProfileServletController
 */
@WebServlet(description = "Profile Servlet",
		   urlPatterns = { "/ProfileServlet" })

public class ProfileServletController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    //used to populate boxes
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		ResponseBase jsonResponse;
    	Gson gson = new Gson();
		
		//stack overflow conversion solution
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());

		//this check does not work when empty
		if(inputMap.get("amount") != "" ){
			
			UserDaoImpl dao = new UserDaoImpl();
			boolean result = dao.updateBalance(inputMap.get("amount").toString(), inputMap.get("user").toString());
			
			if(result){
				jsonResponse = new ResponseBase("sucessfully updated balance", "true");
	        	String json = gson.toJson(jsonResponse); 	
	        	response.getWriter().write(json); 
			} else {
				jsonResponse = new ResponseBase("balance could not be updated", "false");
	        	String json = gson.toJson(jsonResponse); 	
	        	response.getWriter().write(json); 			}
		} else {
			jsonResponse = new ResponseBase("The input feild cannot be empty", "false");
        	String json = gson.toJson(jsonResponse); 	
        	response.getWriter().write(json); 
		}
	}

}
