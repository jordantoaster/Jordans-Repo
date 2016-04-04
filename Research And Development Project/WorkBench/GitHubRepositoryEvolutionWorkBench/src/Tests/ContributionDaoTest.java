/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the contributionDAO
 */

package Tests;

import static org.junit.Assert.*;

import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.ContributionDao;
import Models.Contributions;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class ContributionDaoTest {
	
	private String[]  additions = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  deletions = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  difference = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  LOC = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  dates = {"testInputOne", "testInputTwo", "testInputThree"};
	private String project = "TestProject";
	Contributions contributions;
	ContributionDao dao;
	
	@Before
	public void setup(){
		contributions = new Contributions(additions, deletions, difference, LOC, dates, project);
		dao = new ContributionDao();
	}
	
	@Test
	public void test1ContributionDaoInsert(){
		assertEquals(true, dao.insertContributions(contributions, "Backup"));
	}
	
	@Test
	public void test2ContributionDaoGet(){		
		ArrayList<Contributions> result = dao.getContributions("Backup");
		assertEquals(1, result.size());
	}
	
	@Test
	public void test3ContributionDaoDelete(){		
		assertEquals(true, dao.deleteContributions(contributions, "Backup"));
	}
}
