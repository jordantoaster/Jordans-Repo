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
     	       url : 'http://localhost:8080/MyAwesomeApp/MarketplaceServlet',
     	       dataType: 'JSON',
     	       data : {input : res} ,
     	            success : function(response) {
     	            	
     	            //parse json feedback
     	            if(response != "[]"){
     	            	response = JSON.parse(response);
     	            	
     	            	for(i = 0; i < response.length; i++){
     	            		
 	            			//remove name spaces, append as id. add info to box
 	            			str = response[i]["bookName"];
 	            			var book = $('<option id='+response[i]["bookId"]+'>'+str+'</option>'); 
 	            			
 	            			//divide into boxes based on status
     	            		if(response[i]["forSale"] == false){
     	            			book.appendTo('#booksBoxSell');    	
     	            		} else { 
     	            			book.appendTo('#booksBoxBuy'); 
     	            		}    	            		
     	            	}
     	            }
     	                           
     	            },
     	            error: function() {
     	                $('#ajaxGetUserServletResponse').text('An error occurred');
     	             }
     	      });   
     }
     
     $(document.body).on('click', '#sell' ,function(){
    	 
     	var obj = new Object();
    	obj.id = $( "#booksBox option:selected" ).attr('id')
    	obj.status = "true";
    	
    	 $.ajax({
   	       type : 'post',
   	       url : 'http://localhost:8080/MyAwesomeApp/MarketplaceServlet',
   	       dataType: 'JSON',
   	       data : {input : JSON.stringify(obj)} ,
   	            success : function(response) {
                 	$('#ajaxGetUserServletResponse').text(response["feedback"]);
   	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
   	            },
   	            error: function() {
                 	$('#ajaxGetUserServletResponse').text("an error occured");
   	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
   	             }
   	      });   
     });
}); 