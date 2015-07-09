/**
 * Handles client side logic for the info page
 */

$(document).ready(function(){
    
    var params = getParams();
    var uid = params["id"][0]
    	
    fetchBookInfo(uid);
    
    function fetchBookInfo(params){
    	$.ajax({
 	       type : 'get',
 	       url : 'http://localhost:8080/MyAwesomeApp/BookInformationServlet',
 	       dataType: 'JSON',
 	       data : {input : qd["bookid"][0]} ,
 	            success : function(response) {
 	            	
 	            //parse json feedback
 	            if(response != ""){
 	            	response = JSON.parse(response);
 	            	
 	            	//add image
            		str = response[0]["bookId"].replace(/\s+/g, '');
            		var img = $('<img id='+str+' class="books">'); 
            		img.attr('src', response[0]["bookImage"]);
            		img.appendTo('#bookImage');
            		
            		//add details
            	     $('#bookNameFeild').text(response[0]["bookName"])
            	     $('#bookPriceFeild').text(response[0]["bookPrice"])
            	     $('#owner').text(response[0]["username"])
            	     $('#forSale').text(response[0]["forSale"])
 	            	
 	            }
 	                           
 	            },
 	            error: function() {
 	                $('#ajaxGetUserServletResponse').text('An error occurred');
	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
 	             }
 	      });
    }

}); 