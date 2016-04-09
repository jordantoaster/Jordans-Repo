/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the tagDao
 */

package Tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;
import Daos.CommitsDao;
import Daos.TagDao;
import Models.Commits;
import Models.Tags;
import Utility.TestSetup;

import static org.hamcrest.CoreMatchers.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TagDaoTest {
	TagDao dao = new TagDao();
	String[] dates = TestSetup.generateRandomStringArray(500);
	String[] data = TestSetup.generateRandomStringArray(500);
	Tags tag = new Tags(dates, data, "testProject");
		
	@Test
	public void test1InsertTag(){
		assertEquals(true, dao.insertTags(tag, "Backup"));
	}
	
	@Test
	public void test2GetTag(){
		ArrayList<Tags> result = dao.getTags("Backup");
		assertThat(result.size(), not(0));
	}
	
	@Test
	public void test3UpdateTag(){
		assertEquals(true, dao.updateTags(tag, "Backup"));
	}
	
	@Test
	public void test4DeleteTag(){
		assertEquals(true, dao.deleteTags(tag, "Backup"));
	}
}
