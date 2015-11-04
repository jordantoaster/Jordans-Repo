package Tests;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.junit.Before;
import org.junit.Test;

import com.mongodb.DBCollection;

import Daos.dbConnectionBuilder;

public class DbConnectionBuilderTest {
	
	String queryOne;
	String queryTwo;
	String queryThree;
	dbConnectionBuilder collection;

	@Before
	public void setup(){
		queryOne = "Users";
		queryTwo = "Contributions";
		queryThree = "Null";
		collection = new dbConnectionBuilder();
	}
	
	@Test
	public void testGetMongoConnection(){
		//assertNotNull(collection.getMongoCollection(queryOne));
		//assertNotNull(collection.getMongoCollection(queryTwo));
		//assertNull(collection.getMongoCollection(queryThree));
	}

}
