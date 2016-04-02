/**
 * @author Jordan McDonald
 *
 * Description - uses the java run time instance to access to command line and export the database
 */

package Actions;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ExportAction implements Action{

	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		try {
			Runtime.getRuntime().exec("mongodump --host non-smudgey-pc --port 27017 --db GithubEvolution --out D:\\Users\\jordann\\Desktop\\Export\\results.json");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "Export successful - check your folders!";
	}

}
