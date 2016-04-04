/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the contributionDAO
 */

package Tests;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import Daos.ContributionDao;
import Models.Contributions;

public class ContributionDaoTest {
	
	private String[]  additions = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  deletions = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  difference = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  LOC = {"testInputOne", "testInputTwo", "testInputThree"};
	private String[]  dates = {"testInputOne", "testInputTwo", "testInputThree"};
	private String project = "Test Project";
	Contributions contributions;
	ContributionDao dao;
	
	@Before
	public void setup(){
		contributions = new Contributions(additions, deletions, difference, LOC, dates, project);
		dao = new ContributionDao();
	}
	
	@Test
	public void testContributionDaoInsert(){
		assertEquals(true, dao.insertContributions(contributions, "Backup"));
	}
}
