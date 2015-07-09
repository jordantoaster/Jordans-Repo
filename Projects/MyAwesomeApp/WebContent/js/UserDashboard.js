/**
 * Handles JS logic for the dashboard page
 */

$(document).ready(function(){
	
	//extracts the uid from the url	
    var params = getParams();
    var uid = params["id"][0]
    
    fetchBookList();
    
$('#leftSlide').click(function(e) {
    	
	alert("WIP");
 });

$('#rightSlide').click(function(e) {
	
	alert("WIP");
 });
    
    
    function fetchBookList(){
    	$.ajax({
    	       type : 'get',
    	       url : 'http://localhost:8080/MyAwesomeApp/DashboardServlet',
    	       dataType: 'JSON',
    	       data : {input : uid} ,
    	            success : function(response) {
    	            	
    	            //parse json feedback
    	            if(response != ""){
    	            	response = JSON.parse(response);
    	            	
    	            	//hard coded terminator
    	            	for(i = 0; i < 4; i++){
    	            		//remove name spaces, append as id. add image as element to div
    	            		str = response[i]["bookName"].replace(/\s+/g, '');
    	            		var img = $('<img id='+str+' class="books">'); 
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