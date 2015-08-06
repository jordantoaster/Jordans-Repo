/**
 * Js code for search results
 */

$(document).ready(function(){
	
	var origUsers = [];
    var params = getParams();
    var searchString = params["sinput"][0];
    var uid = params["id"][0];
    
    fetchResults();
    
    //passes search data to the server and returns with filled select box
    function fetchResults(){
    	
    	var obj = new Object();
    	obj.search = searchString;
    	
    	$.ajax({
	       type : 'get',
	       url : 'http://localhost:8080/MyAwesomeApp/SearchServlet',
	       dataType: 'JSON',
	       data : {input : JSON.stringify(obj)} ,
	            success : function(response) {
	            	
	            //parse json feedback
	            if(response != "[]"){
	            	response = JSON.parse(response);
	            		            	
	            	for(i = 0; i < response.length; i++){
	            		
          			//remove name spaces, append as id. add info to box
          			str = response[i]["bookName"];
          			var book = $('<option id='+response[i]["bookId"]+' style="margin-bottom: 2%;">'+str+'</option>'); 
          			
          			//add to select  box
	                $('#booksBoxInfo').append(book);	            		   	            		
	            	}
	            }
	                           
	            },
	            error: function() {
	                $('#ajaxGetUserServletResponse').text('An error occurred');
	             }
	      });  
    }
	
	 $(document.body).on('click', '#infoButton' ,function(){    	     	 
    	 
	    	if($( "#booksInfo option:selected" ).attr('id') != undefined){
	    		
	    	  window.location = "http://localhost:8080/MyAwesomeApp/jsp/BookInformation.jsp" + '?bookid=' + $( "#booksInfo option:selected" ).attr('id') + '&id=' +uid;
	    	
	    	} else {
	    		
	          $('#ajaxGetUserServletResponse').text("Please Pick a book :)");
	          $("#ajaxGetUserServletResponse").css({"opacity":"1"});
	    	}
	    	
	     });
});