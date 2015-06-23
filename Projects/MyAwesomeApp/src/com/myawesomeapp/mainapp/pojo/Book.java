package com.myawesomeapp.mainapp.pojo;

public class Book {
	
	private String bookName;
	private String bookImage;
	private String bookPrice;
	private String bookId;
	
	public Book(String bookName, String bookImage, String bookPrice, String bookId){
		this.bookId = bookId;
		this.bookImage = bookImage;
		this.bookName = bookName;
		this.bookPrice = bookPrice;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookImage() {
		return bookImage;
	}

	public void setBookImage(String bookImage) {
		this.bookImage = bookImage;
	}

	public String getBookPrice() {
		return bookPrice;
	}

	public void setBookPrice(String bookPrice) {
		this.bookPrice = bookPrice;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	

}
