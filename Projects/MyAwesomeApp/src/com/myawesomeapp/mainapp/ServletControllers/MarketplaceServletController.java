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
import com.myawesomeapp.utility.ResponseBase;


@WebServlet(
        description = "Marketplace Servlet", 
        urlPatterns = { "/MarketplaceServlet" })
public class MarketplaceServletController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	Gson gson = new Gson();
	
    public MarketplaceServletController() {
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
        BookDaoImpl dao = new BookDaoImpl();
    	ResponseBase JsonResponse;
    	
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());

        Boolean result = dao.changeBookSaleStatus(inputMap.get("id").toString(), inputMap.get("status").toString());
        
        if(result) {
        	JsonResponse = new ResponseBase("Success", "true");
        } else {
        	JsonResponse = new ResponseBase("Failed", "false");
        }
        
    	String json = gson.toJson(JsonResponse); 	
    	response.getWriter().write(json); 
	}

}
