/**
 * Client side logic 
 */

$(document).ready(function(){
	
    var query = location.search;
    var res = query.replace('?id=', '');
    
    fetchBooks();
     
     function fetchBooks(){
     	$.ajax({
     	       type : 'get',
     	       url : 'http://localhost:8080/MyAwesomeApp/BuyBooksServlet',
     	       dataType: 'JSON',
     	       data : {input : res} ,
     	            success : function(response) {
     	            	
     	            //parse json feedback
     	            if(response != "[]"){
     	            	response = JSON.parse(response);
     	            	
     	            	for(i = 0; i < response.length; i++){
     	            		//remove name spaces, append as id. add info to box
     	            		str = response[i]["bookName"].replace(/\s+/g, '');
     	            		var book = $('<option id='+str+'>'+str+'</option>'); 
     	            		book.appendTo('#booksBox');  
     	            		
     	            		//does not work, need to target id correctly
     	            		if(response[i]["forSale"] == true){
     	                  	    $(str).css("background-color", "red");
     	            		} else {
     	                  	    $(str).css("background-color", "green");
     	            		}     	            		     	            		
     	            	}
     	            }
     	                           
     	            },
     	            error: function() {
     	                $('#ajaxGetUserServletResponse').text('An error occurred');
     	             }
     	      });   
     }
}); 