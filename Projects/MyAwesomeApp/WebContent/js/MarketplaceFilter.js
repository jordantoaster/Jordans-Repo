/**
 * navigation logic for the marketplace splash page
 */

$(document).ready(function(){
     
     $(document.body).on('click', '#buy' ,function(){
    	 var query = location.search;
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/BuyBooks.jsp" + query;
     });
     
     $(document.body).on('click', '#sell' ,function(){
    	 var query = location.search;
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/SellBooks.jsp" + query;
     });     
}); 