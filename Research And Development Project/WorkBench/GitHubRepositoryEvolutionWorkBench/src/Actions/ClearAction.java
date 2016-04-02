/**
 * @author Jordan McDonald
 *
 * Description - activate a java run time instance to perform command line action - in this case wiping the MongoDB database
 */

package Actions;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClearAction implements Action{

	boolean stop = true;
	
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		//Removes all collections from the MongoDB database
		try {
			if(!stop){
				Runtime.getRuntime().exec("mongo addDBNameHere --eval 'db.dropDatabase();'");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "Clear successful!";
	}

}
