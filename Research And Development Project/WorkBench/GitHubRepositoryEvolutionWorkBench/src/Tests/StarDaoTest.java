/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the starDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.StarDao;
import Models.Commits;
import Models.Stars;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class StarDaoTest {
	StarDao dao = new StarDao();
	String[] dates = {"22","1"};
	String[] data = {"22","1"};
	Stars star = new Stars(dates, data, "testProject");
		
	@Test
	public void test1InsertCommit(){
		assertEquals(true, dao.insertStars(star, "Backup"));
	}
	
	@Test
	public void test2GetCommit(){
		ArrayList<Stars> result = dao.getStars("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateCommit(){
		assertEquals(true, dao.updateStars(star, "Backup"));
	}
	
	@Test
	public void test4DeleteCommit(){
		assertEquals(true, dao.deleteStars(star, "Backup"));
	}
}
