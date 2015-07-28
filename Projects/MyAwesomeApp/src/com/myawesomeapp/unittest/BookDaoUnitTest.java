package com.myawesomeapp.unittest;

import static org.junit.Assert.*;

import org.junit.*;

import com.myawesomeapp.mainapp.dao.BookDaoImpl;
import com.myawesomeapp.mainapp.dao.UserDaoImpl;

public class BookDaoUnitTest {
	
	UserDaoImpl userImpl = new UserDaoImpl();
	BookDaoImpl bookImpl = new BookDaoImpl();
	
	/*userImpl.insertUser("testUser", "pass","");
		bookImpl.insertBook("9999", "testBook", "",0, "testUser", "true");
	
	bookImpl.deleteBook("9999");
	userImpl.deleteUser("testUser", "pass");*/
	
	@Before
	public void setup(){
		userImpl.insertUser("testUserTwo", "pass","url");
		userImpl.insertUser("testUser", "pass","url");
		bookImpl.insertBook("9999", "testBook", "",5, "testUser", "true");
		bookImpl.insertBook("9998", "testBookTwo", "",500, "testUser", "true");
	}
	
	@After
	public void teardown(){
		bookImpl.deleteBook("testBook");
		bookImpl.deleteBook("testBookTwo");
		userImpl.deleteUser("testUser", "pass");
		userImpl.deleteUser("testUserTwo", "pass");
	}

	@Test
	public void testGetAllUserBooks(){		
		assertNotEquals("[]", bookImpl.getAllUserBooks("testUser"));
		assertEquals("[]", bookImpl.getAllUserBooks(""));
	}
	
	@Test
	public void testChangeBookSaleStatus(){
		assertEquals(true, bookImpl.changeBookSaleStatus("9999", "false"));
		assertEquals(true, bookImpl.changeBookSaleStatus("", "false"));
	}
	
	@Test
	public void testPurchaseBook(){
		assertEquals(true, bookImpl.purchaseBook("9999", "false", "testUserTwo", "testUser"));
		assertEquals(false, bookImpl.purchaseBook("9998", "false", "testUserTwo", "testUser"));
		
		bookImpl.purchaseBook("9999", "false", "testUser", "testUserTwo");
	}
	
	@Test
	public void testGetAllBooksForSale(){
		assertNotEquals("[]", bookImpl.getAllBooksForSale("TestUser"));
		assertNotEquals("[]", bookImpl.getAllBooksForSale("TestUserTwo"));
	}
	
	@Test
	public void testGetBookDetails(){
		assertNotEquals("[]", bookImpl.getAllBooksForSale("9999"));
		assertNotEquals("[]", bookImpl.getAllBooksForSale("9998"));
	}
	
	@Test
	public void testGetSearchResults(){
		assertNotEquals("[]", bookImpl.getAllBooksForSale("lord"));
		assertNotEquals("[]", bookImpl.getAllBooksForSale("hunger"));
	}
	
	@Test
	public void testUpdateOwner(){
		assertEquals(true, bookImpl.updateOwner("testUser", "9998"));
		assertEquals(true, bookImpl.updateOwner("testUserTwo", "9999"));
	}
	
}
