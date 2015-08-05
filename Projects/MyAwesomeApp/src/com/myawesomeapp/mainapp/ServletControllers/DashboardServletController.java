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
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.myawesomeapp.mainapp.dao.BookDaoImpl;
import com.myawesomeapp.mainapp.dao.UserDaoImpl;
import com.myawesomeapp.utility.StringUrlEncoder;


@WebServlet(
        description = "Dashboard Servlet", 
        urlPatterns = { "/DashboardServlet" })
public class DashboardServletController extends HttpServlet {
	
	Gson gson = new Gson();
	
	private static final long serialVersionUID = 1L;
	
    public DashboardServletController() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				
		BookDaoImpl dao = new BookDaoImpl();
		UserDaoImpl daoUser = new UserDaoImpl();
		StringUrlEncoder encoder = new StringUrlEncoder();
		
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
		String jsonResponseObject;
		String jsonResponse;
		String decodedUsername = daoUser.getDecodedUsername(inputMap.get("uid").toString());
					
		if(inputMap.get("action").toString().equals("getBooks")){
			//get json object of book details based on uid
			jsonResponseObject = dao.getAllUserBooks(decodedUsername);	
		
			//convert to json
			jsonResponse = gson.toJson(jsonResponseObject);
		
			System.out.println(jsonResponse);
		
			//send to client
			response.getWriter().write(jsonResponse); 
		} else {
			//get profile pic and username details
			jsonResponseObject = daoUser.getUserDetails(decodedUsername);	
		
			//convert to json
			jsonResponse = gson.toJson(jsonResponseObject);
		
			System.out.println(jsonResponse);
		
			//send to client
			response.getWriter().write(jsonResponse); 
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
