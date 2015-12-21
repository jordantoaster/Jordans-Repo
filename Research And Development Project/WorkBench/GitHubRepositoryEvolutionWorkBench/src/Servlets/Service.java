package Servlets;


import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Actions.Action;
import Actions.ActionFactory;

/**
 * Servlet implementation class Service - Implements the front controller (mediator) pattern
 */
@WebServlet("/Service")
public class Service extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Service() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		performAction(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		performAction(request, response);
	}
	
	protected void performAction(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		Action action = ActionFactory.getAction(request.getParameter("action"));
		
		String outcome = "";
		outcome = action.execute(request, response);
		
		response.getWriter().write(outcome);
	}
}
