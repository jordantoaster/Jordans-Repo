/**
 * Handles JS logic for the dashboard page
 */

$(document).ready(function(){
	
	//extracts the uid from the url	
    var params = getParams();
    var uid = params["id"][0]
    
    sendToServer("getBooks");
    sendToServer("getProfilePicture");   
    
    function sendToServer(action){
    	
    	var obj = new Object();
    	obj.uid = uid;
    	obj.action = action;
    	
    	$.ajax({
    	       type : 'get',
    	       url : 'http://localhost:8080/MyAwesomeApp/DashboardServlet',
    	       dataType: 'JSON',
    	       data : {loadProds: 1, input : JSON.stringify(obj)} ,
    	            success : function(response) {
    	            	
    	            //parse json feedback
    	            if(response != ""){
    	            	response = JSON.parse(response);
    	            	
    	            	if(obj.action == "getBooks"){
    	            		//get books
    	            		fetchBooksList(response);
    	            	} else {
    	            		//get profile picture
    	            		fetchProfilePicture(response);
    	            	}
    	            	
	            	}
    	                           
    	            },
    	            error: function() {
    	                $('#ajaxGetUserServletResponse').text('An error occurred');
    	             }
    	      });
    }
    
    function fetchBooksList(response){
    	//hard coded terminator
    	for(i = 0; i < Object.keys(response).length; i++){
    		
    		if(i >= 4) break;
    		
    		//remove name spaces, append as id. add image as element to div
    		str = response[i]["bookName"].replace(/\s+/g, '');
    		var img = $('<img id='+str+' class="books">'); 
    		img.attr('src', response[i]["bookImage"]);
    		img.appendTo('#userBooks');
    	}  
    }
    
    function fetchProfilePicture(response){
    	if(response["profilePicture"] != "") {
    		
    		//add welcome message and profile pic
    		$("#infoSection").append('<p>Welcome '+response["username"]+'!</p>');		
    		var img = $('<img id="profileImage">'); 
    		img.attr('src', response["profilePicture"]);
    		img.appendTo('#infoSection');
    		
    	} else {
    		$("#infoSection").append('<img id="profileImage" src="http://localhost:8080/MyAwesomeApp/images/ProfilePic/default.png">')
    	}
    }
}); 