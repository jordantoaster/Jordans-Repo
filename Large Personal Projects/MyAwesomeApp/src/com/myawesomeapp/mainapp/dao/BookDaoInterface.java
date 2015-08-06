package com.myawesomeapp.mainapp.dao;

public interface BookDaoInterface {
	public String getAllUserBooks(String uid);
	public boolean changeBookSaleStatus(String bookId, String status);
	public boolean purchaseBook(String bookId, String bookStatus, String newOwner, String oldOwner);
	public String getAllBooksForSale(String uid);
	public String getBookDetails(String bookId);
	public boolean updateOwner(String uid, String bookId);
	public String getSearchResults(String searchString);
	public boolean insertBook(String id, String bookName, String bookImage, int bookPrice, String username, String forSale);
	public boolean deleteBook(String uid);
}
