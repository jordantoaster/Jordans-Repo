/**
 * Consistently used JS code
 */

$(document).ready(function(){
     $('#navBar').load('http://localhost:8080/MyAwesomeApp/html/HeaderTemplate.html');
     
     $(document.body).on('click', '#profileLink' ,function(){
    	 var query = location.search;
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/UserProfile.jsp" + query;
     });
     
     $(document.body).on('click', '#marketplaceLink' ,function(){
    	 var query = location.search;
    	 window.location = "http://localhost:8080/MyAwesomeApp/jsp/MarketplaceFilter.jsp" + query;
     });     
}); 
