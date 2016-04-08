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
import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class CommitDaoTest {
	
	CommitsDao dao = new CommitsDao();
	String[] dates = {"22","1"};
	String[] data = {"22","1"};
	Commits commit = new Commits(dates, data, "testProject");
	
	String[] datesTwo = {"22","1"};
	String[] dataTwo = {"22","1"};
	Commits commitTwo = new Commits(datesTwo, dataTwo, "testProject2");
		
	@Test
	public void test1InsertCommit(){
		assertEquals(true, dao.insertCommits(commit, "Backup"));
		assertEquals(true, dao.insertCommits(commitTwo, "Backup"));
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
		assertEquals(true, dao.updateCommit(commit, "Backup"));
		assertEquals(true, dao.updateCommit(commitTwo, "Backup"));
	}
	
	@Test
	public void test4DeleteCommit(){
		assertEquals(true, dao.deleteCommit(commit, "Backup"));
		assertEquals(true, dao.deleteCommit(commitTwo, "Backup"));
	}
	
}
