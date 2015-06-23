/**
 * Handles JS logic for the dashboard page
 */

$(document).ready(function(){
	
	//extracts the uid from the url
    var query = location.search;
    var res = query.replace('?id=', '');
    
    fetchBookList();
    
    function fetchBookList(){
    	$.ajax({
    	       type : 'get',
    	       url : 'http://localhost:8080/MyAwesomeApp/DashboardServlet',
    	       dataType: 'JSON',
    	       data : {input : res} ,
    	            success : function(response) {
    	            	
    	            //parse json feedback
    	            if(response != ""){
    	            	response = JSON.parse(response);
    	            	
    	            	for(i = 0; i < response.length; i++){
    	            		var img = $('<img id="Book + i" class="books">'); 
    	            		img.attr('src', response[i]["bookImage"]);
    	            		img.appendTo('#userBooks');
    	            	}
    	            }
    	                           
    	            },
    	            error: function() {
    	                $('#ajaxGetUserServletResponse').text('An error occurred');
    	             }
    	      });
    }
}); 