package com.myawesomeapp.mainapp.dao;

public interface BookDaoInterface {
	public String getAllUserBooks(String uid);
	public boolean changeBookSaleStatus(String bookId, String status);
}
