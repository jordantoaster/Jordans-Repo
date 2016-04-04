/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the IssueDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.IssueDao;
import Models.Commits;
import Models.Issues;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class IssueDaoTest {

	IssueDao dao = new IssueDao();
	String[] dates = {"22","1"};
	String[] data = {"22","1"};
	String[] dataTwo = {"22","1"};
	String[] dataThree = {"22","1"};

	Issues issue = new Issues(dates, data,dataTwo, dataThree, "test");
	
	Issues issueTwo = new Issues(dates, "project" ,dataTwo, "comments");

		
	@Test
	public void test1InsertIssue(){
		assertEquals(true, dao.insertIssues(issue, "Backup"));
	}
	
	@Test
	public void test2GetIssue(){
		ArrayList<Issues> result = dao.getIssues("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateIssue(){
		assertEquals(true, dao.updateIssues(issue, "Backup"));
	}
	
	@Test
	public void test4DeleteIssue(){
		assertEquals(true, dao.deleteIssues(issue, "Backup"));
	}
	
	@Test
	public void test5InsertIssueComment(){
		assertEquals(true, dao.insertIssuesComments(issueTwo, "Backup"));
	}
	
	@Test
	public void test6GetIssue(){
		ArrayList<Issues> result = dao.getIssuesComments("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test7UpdateIssue(){
		assertEquals(true, dao.updateComments(issueTwo, "Backup"));
	}
	
	@Test
	public void test8DeleteIssue(){
		assertEquals(true, dao.deleteComments(issueTwo, "Backup"));
	}
}
