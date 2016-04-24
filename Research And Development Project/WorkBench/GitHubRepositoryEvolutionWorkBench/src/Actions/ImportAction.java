/**
 * @author Jordan McDonald
 *
 * Description - uses the java run time instance to access to command line and import the database
 */

package Actions;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ImportAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		try {
			Runtime.getRuntime().exec("mongorestore --host non-smudgey-pc --port 27017 --db GithubEvolution D:\\Users\\jordann\\Desktop\\Export\\results.json\\GitHubEvolution");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "Import successful - check RoboMongo!";
	}

}