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
        description = "Buy Books Servlet", 
        urlPatterns = { "/BuyBooksServlet" })
public class SellBooksServletController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	Gson gson = new Gson();
	
    public SellBooksServletController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BookDaoImpl dao = new BookDaoImpl();
      		
		//get json object of book details based on uid
		String jsonResponseObject = dao.getAllUserBooks(request.getParameter("input"));	
				
		//convert to json
		String jsonReponse = gson.toJson(jsonResponseObject);
				
		//send to client
    	response.getWriter().write(jsonReponse); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
