package Tests;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import Daos.ContributionDao;
import Models.Contributions;

public class ContributionDaoTest {
	
	private List<Integer> additions;
	private List<Integer> deletions;
	private List<Integer> LOC;
	private List<String> dates;
	private String project;
	Contributions contributions;
	ContributionDao dao;
	
	@Before
	public void setup(){
		additions = new ArrayList<Integer>();
		deletions  = new ArrayList<Integer>();
		LOC  = new ArrayList<Integer>();
		dates  = new ArrayList<String>();
		additions.add(1);
		deletions.add(3);
		LOC.add(2323);
		dates.add("12th feb");
		project = "jordan";
		contributions = new Contributions(additions, deletions, LOC, dates, project);
		dao = new ContributionDao();
	}
	
	@Test
	public void testContributionDaoInsert(){
		assertEquals(true, dao.insertContributions(contributions));
	}
}
