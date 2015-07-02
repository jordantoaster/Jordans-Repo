package com.myawesomeapp.mainapp.dao;

public interface BookDaoInterface {
	public String getAllUserBooks(String uid);
	public boolean changeBookSaleStatus(String bookId, String status);
	public boolean changeBookOwner(String bookId, String bookStatus, String newOwner);
	public String getAllBooksForSale(String uid);
}
