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
import Utility.TestSetup;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ForkDaoTest {

	ForkDao dao = new ForkDao();
	
	//small data one
	String[] dates = TestSetup.generateRandomStringArray(100);
	String[] data = TestSetup.generateRandomStringArray(100);
	Forks fork = new Forks(dates, data, "testProject");
	
	//small data two
	String[] datesTwo = TestSetup.generateRandomStringArray(50);
	String[] dataTwo = TestSetup.generateRandomStringArray(50);
	Forks forkTwo = new Forks(datesTwo, dataTwo, "testProjectTwo");
	
	//large test
	String[] dataThree = TestSetup.generateRandomStringArray(1000);
	String[] datesThree = TestSetup.generateRandomStringArray(1000);
	Forks forkThree = new Forks(datesThree, dataThree, "testProjectTwo");

		
	@Test
	public void test1InsertFork(){
		assertEquals(true, dao.insertForks(fork, "Backup"));
		assertEquals(true, dao.insertForks(forkTwo, "Backup"));
		assertEquals(true, dao.insertForks(forkThree, "Backup"));
	}
	
	@Test
	public void test2GetFork(){
		ArrayList<Forks> result = dao.getForks("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateFork(){
		fork.setDates(datesTwo);
		forkTwo.setDates(dates);
		assertEquals(true, dao.updateFork(fork, "Backup"));
		assertEquals(true, dao.updateFork(forkTwo, "Backup"));
		assertEquals(true, dao.updateFork(forkThree, "Backup"));
	}
	
	@Test
	public void test4DeleteFork(){
		assertEquals(true, dao.deleteFork(fork, "Backup"));
		assertEquals(true, dao.deleteFork(forkTwo, "Backup"));
		assertEquals(true, dao.deleteFork(forkThree, "Backup"));
	}
	
}
