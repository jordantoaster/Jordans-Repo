/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the statDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.StatDao;
import Models.Commits;
import Models.Correlation;
import Models.GrowthRateModel;
import Models.Mean;
import Models.Normality;
import Utility.TestSetup;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class StatDaoTest {
	
	StatDao dao = new StatDao();
	double[] data =  TestSetup.generateRandomArray(500);
	String[] datatwo =  TestSetup.generateRandomStringArray(500);
	
	@Test
	public void test1InsertMean(){
		Mean mean = new Mean("proj", 33, "type");
		assertEquals(true, dao.insertMean(mean, "Backup"));
	}
	
	@Test
	public void test2InsertCross(){
		assertEquals(true, dao.insertCrossCorr(0.2, "proj", "t1", "t2", "Backup"));
	}
	
	@Test
	public void test3GetMean(){
		int[] result = dao.getAllMean("t1", "Backup");
		assertThat(result.length, is(0));
	}
	
	@Test
	public void test4InsertCorr(){
		Correlation correlation = new Correlation("", "", "", "", "", "", "", "");
		assertEquals(true, dao.insertCorrelation(correlation, "Backup"));
	}
	
	@Test
	public void test5InsertG(){
		GrowthRateModel growth = new GrowthRateModel("testProject", "test", data, 0.2, 0.5);
		assertEquals(true, dao.insertGrowthRate(growth, "Backup"));
	}
	
	@Test
	public void test6InsertNormality(){
		Normality normalityModel = new Normality("project", datatwo, "additions");
		assertEquals(true, dao.insertNormality(normalityModel, "Backup"));
	}
	
	@Test
	public void test7NumInCollection(){
		assertThat(dao.getNumInCollection("Mean", "Backup"), not(0));
	}
	
	@Test
	public void test8GetGrowth(){
		double[] growth = dao.getGrowthRateIndex(0, "Backup");
		assertThat(growth.length, not(0));
	}
	
	@Test
	public void test9GetGrowth(){
		ArrayList<GrowthRateModel> growth = dao.getGrowthRate("Backup");
		assertThat(growth.size(), not(0));
	}
	
	@Test
	public void test10InsertVariance(){
		assertEquals(true, dao.insertVariance(33, "addition", "Backup"));
	}
	
	@Test
	public void test11InsertSd(){
		assertEquals(true, dao.insertVariance(33, "", "Backup"));
	}

	@Test
	public void test12GetCorr(){
		ArrayList<String> growth = dao.getAllCorrelations("t1", "t2", "Backup");
		assertThat(growth.size(), is(0));
	}
}
