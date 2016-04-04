/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the forkDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.ForkDao;
import Models.Commits;
import Models.Forks;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ForkDaoTest {

	ForkDao dao = new ForkDao();
	String[] dates = {"22","1"};
	String[] data = {"22","1"};
	Forks fork = new Forks(dates, data, "testProject");
		
	@Test
	public void test1InsertFork(){
		assertEquals(true, dao.insertForks(fork, "Backup"));
	}
	
	@Test
	public void test2GetFork(){
		ArrayList<Forks> result = dao.getForks("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateFork(){
		assertEquals(true, dao.updateFork(fork, "Backup"));
	}
	
	@Test
	public void test4DeleteFork(){
		assertEquals(true, dao.deleteFork(fork, "Backup"));
	}
	
}
