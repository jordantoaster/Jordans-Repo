/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the lawDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.LawsDao;
import Models.Commits;
import Models.GrowthRateModel;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class LawsDaoTest {
	LawsDao dao = new LawsDao();
	double[] data = {22,1,5,3,2};
	GrowthRateModel growth = new GrowthRateModel("testProject", "test", data, 0.2, 0.5);
		
	@Test
	public void test1InsertG(){
		assertEquals(true, dao.insertGrowthRate(growth, "Backup"));
	}
	
	@Test
	public void test2GetG(){
		ArrayList<Double> result = dao.getGrowthRateAverages("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateG(){
		assertEquals(true, dao.updateGrowth(growth, "Backup"));
	}
	
	@Test
	public void test4DeleteG(){
		assertEquals(true, dao.deleteGrowth(growth, "Backup"));
	}
}
