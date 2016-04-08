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
	
	//test data
	private String[]  additions = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  deletions = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  difference = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  LOC = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  dates = {"testInputOne", "testInputTwo", "testInputThree"};
	private String project = "TestProject";
	private String[]  additionsTwo = {"testInputOneV2", "testInputTwoV2", "testInputThreeV2"};
	private String[]  deletionsTwo = {"testInputOneV2", "testInputTwoV2", "testInputThreeV2"};
	private String[]  differenceTwo = {"testInputOneV2", "testInputTwoV2", "testInputThreeV2"};
	private String[]  LOCTwo = {"testInputTwoV2", "testInputTwoV2", "testInputThreeV2"};
	private String[]  datesTwo = {"testInputTwoV2", "testInputTwoV2", "testInputThreeV2"};
	private String projectTwo = "TestProject2";
	
	//enable use of classes
	Contributions contributions;
	Contributions contributionsTwo;
	ContributionDao dao;
	
	@Before
	public void setup(){
		contributions = new Contributions(additions, deletions, difference, LOC, dates, project);
		contributionsTwo = new Contributions(additionsTwo, deletionsTwo, differenceTwo, LOCTwo, datesTwo, projectTwo);
		dao = new ContributionDao();
	}
	
	@Test
	public void test1ContributionDaoInsert(){
		assertEquals(true, dao.insertContributions(contributions, "Backup"));
		assertEquals(true, dao.insertContributions(contributionsTwo, "Backup"));
	}
	
	@Test
	public void test2ContributionDaoGet(){		
		ArrayList<Contributions> result = dao.getContributions("Backup");
		assertEquals(2, result.size());
	}
	
	@Test
	public void test3ContributionDaoDelete(){		
		assertEquals(true, dao.deleteContributions(contributions, "Backup"));
		assertEquals(true, dao.deleteContributions(contributionsTwo, "Backup"));
	}
}
