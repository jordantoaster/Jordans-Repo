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
import com.myawesomeapp.mainapp.dao.BookDaoImpl;

/**
 * Servlet implementation class SearchServlet
 */

@WebServlet(
        description = "Book Search Servlet", 
        urlPatterns = { "/SearchServlet" })

public class SearchServletController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Gson gson = new Gson();

    public SearchServletController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BookDaoImpl dao = new BookDaoImpl();
        String jsonResponseObject;
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
      		
        jsonResponseObject = dao.getSearchResults(inputMap.get("search").toString());	

		String jsonReponse = gson.toJson(jsonResponseObject);	
		
    	response.getWriter().write(jsonReponse); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
