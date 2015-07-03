package com.myawesomeapp.mainapp.pojo;

public class Book {
	
	private String bookName;
	private String bookImage;
	private String bookPrice;
	private String username;
	private String bookId;
	private Boolean forSale;
	
	public Book(String bookName, String bookImage, String bookPrice, String username, String bookId, Boolean forSale){
		this.bookId = bookId;
		this.bookImage = bookImage;
		this.bookName = bookName;
		this.bookPrice = bookPrice;
		this.forSale = forSale;
		this.username = username;
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
	
	public void setForSale(Boolean forSale){
		this.forSale = forSale;
	}
	
	public Boolean getForSale(){
		return forSale;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	
	public String getUsername(){
		return username;
	}
	
}
