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
import com.myawesomeapp.mainapp.dao.UserDaoImpl;
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
       
		UserDaoImpl daoUser = new UserDaoImpl();
		BookDaoImpl dao = new BookDaoImpl();
        String jsonResponseObject;
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
		String decodedUsername = daoUser.getDecodedUsername(inputMap.get("id").toString());

        if(inputMap.containsValue("sell")){
        	jsonResponseObject = dao.getAllUserBooks(decodedUsername);	
        } else {
        	jsonResponseObject = dao.getAllBooksForSale(decodedUsername);
        }
				
		String jsonReponse = gson.toJson(jsonResponseObject);				
    	response.getWriter().write(jsonReponse); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BookDaoImpl dao = new BookDaoImpl();
        UserDaoImpl daoUser = new UserDaoImpl();
    	ResponseBase JsonResponse;
    	boolean result;
    	
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
				
		// == is a good option since were are comparing values not objects per say
		if(!(inputMap.get("id") == null)){
			if(inputMap.containsValue("sell")){
				result = dao.changeBookSaleStatus(inputMap.get("id").toString(), inputMap.get("status").toString());
			} else {
				String decodedUsername = daoUser.getDecodedUsername(inputMap.get("newOwner").toString());
				result = dao.purchaseBook(inputMap.get("id").toString(), inputMap.get("status").toString(), decodedUsername, inputMap.get("oldOwner").toString());
			}
			
			if(result) {
				JsonResponse = new ResponseBase("Success", "true");
			} else {
				JsonResponse = new ResponseBase("Failed", "false");
			}
			
		} else {
			JsonResponse = new ResponseBase("You Must Click On An Input Item", "false");
		}
        
    	String json = gson.toJson(JsonResponse); 	
    	response.getWriter().write(json); 
	}

}
