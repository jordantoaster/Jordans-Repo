/**
 * @author Jordan McDonald
 *
 * Description - determines if a user is logged in or not - then redirects to login page if required -
 * ensures security and that the user are authenticated to access the system
 */
package Filters;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class LoginFilter
 */
@WebFilter("/jsp/QueryPage.jsp") 
public class AuthenticatonFilter implements Filter {

    /**
     * Default constructor. 
     */
    public AuthenticatonFilter() {}

	public void destroy() {}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            res.sendRedirect(req.getContextPath() + "/jsp/SplashPage.jsp");
        } else {
            chain.doFilter(request, response);
        }
	}

	public void init(FilterConfig fConfig) throws ServletException {}
}
