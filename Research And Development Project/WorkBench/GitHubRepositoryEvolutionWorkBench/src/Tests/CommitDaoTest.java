/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the commitDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Models.Commits;
import Utility.TestSetup;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class CommitDaoTest {
	
	//small array one
	CommitsDao dao = new CommitsDao();
	String[] dates = TestSetup.generateRandomStringArray(100);
	String[] data = TestSetup.generateRandomStringArray(100);
	Commits commit = new Commits(dates, data, "testProject");
	
	//small array two
	String[] datesTwo = TestSetup.generateRandomStringArray(50);
	String[] dataTwo = TestSetup.generateRandomStringArray(50);
	Commits commitTwo = new Commits(datesTwo, dataTwo, "testProject2");
	
	//large array
	String[] datesThree = TestSetup.generateRandomStringArray(1000);
	String[] dataThree = TestSetup.generateRandomStringArray(1000);
	Commits commitThree = new Commits(datesThree, dataThree, "testProject3");

		
	@Test
	public void test1InsertCommit(){
		assertEquals(true, dao.insertCommits(commit, "Backup"));
		assertEquals(true, dao.insertCommits(commitTwo, "Backup"));
		assertEquals(true, dao.insertCommits(commitThree, "Backup"));
	}
	
	@Test
	public void test2GetCommit(){
		ArrayList<Commits> result = dao.getCommits("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateCommit(){
		commit.setDates(datesTwo);
		commitTwo.setDates(dates);
		commitThree.setDates(dates);
		assertEquals(true, dao.updateCommit(commit, "Backup"));
		assertEquals(true, dao.updateCommit(commitTwo, "Backup"));
		assertEquals(true, dao.updateCommit(commitThree, "Backup"));
	}
	
	@Test
	public void test4DeleteCommit(){
		assertEquals(true, dao.deleteCommit(commit, "Backup"));
		assertEquals(true, dao.deleteCommit(commitTwo, "Backup"));
		assertEquals(true, dao.deleteCommit(commitThree, "Backup"));
	}
	
}
