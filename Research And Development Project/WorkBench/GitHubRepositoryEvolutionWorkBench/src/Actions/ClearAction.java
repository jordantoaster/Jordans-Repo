package Actions;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClearAction implements Action{

	boolean stop = true;
	
	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		try {
			System.out.println("clear");
			if(!stop){
				Runtime.getRuntime().exec("mongo addDBNameHere --eval 'db.dropDatabase();'");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//mongoexport --host mgo.acme.com --port 10332 --username acmeman --password 12345

		return "Clear successful!";
	}

}
