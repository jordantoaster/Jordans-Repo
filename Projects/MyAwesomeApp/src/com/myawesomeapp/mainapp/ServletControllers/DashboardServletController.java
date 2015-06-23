package com.myawesomeapp.mainapp.ServletControllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.myawesomeapp.mainapp.dao.BookDaoImpl;


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
		
		//get json object of book details based on uid
		String jsonResponseObject = dao.getAllUserBooks(request.getParameter("input"));	
		
		//convert to json
		String jsonReponse = gson.toJson(jsonResponseObject);
		
		System.out.println(jsonReponse);
		
		//send to client
    	response.getWriter().write(jsonReponse); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
