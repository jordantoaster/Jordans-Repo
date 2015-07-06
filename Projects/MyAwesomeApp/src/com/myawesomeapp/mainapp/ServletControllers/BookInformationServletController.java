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
        description = "Book Info Servlet", 
        urlPatterns = { "/BookInformationServlet" })

public class BookInformationServletController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public BookInformationServletController() {
        super();
    }

    //get book details from db, convert to json and return
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Gson gson = new Gson();
		
		BookDaoImpl dao = new BookDaoImpl();
		String bookDetails = dao.getBookDetails(request.getParameter("input"));
		
		String jsonReponse = gson.toJson(bookDetails);
		
		System.out.println(jsonReponse);
		
    	response.getWriter().write(jsonReponse); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}
}
