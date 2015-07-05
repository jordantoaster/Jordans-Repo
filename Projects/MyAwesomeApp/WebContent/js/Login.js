/**
 * handles login JQ and JS
 */

$(document).ready(function() {
    $('#submitButtonLog').click(function(e) {
    	
    	//prevents the submit redirect firing
    	e.preventDefault();
    	
    	//creates an object containing the feilds details
    	var obj = new Object();
    	obj.password = $("#passwordFeild").val();
    	obj.username = $("#userNameFeild").val();
    	obj.action = "login";
    	
    	performAjaxCall(obj);   	
    });
    
    $('#submitButtonReg').click(function(e) {
    	
    	//prevents the submit redirect firing
    	e.preventDefault();
    	
    	//creates an object containing the feilds details
    	var obj = new Object();
    	obj.password = $("#passwordFeild").val();
    	obj.username = $("#userNameFeild").val();
    	obj.confirm = $("#confirmPasswordFeild").val();
    	obj.action = "register";
    	
    	performAjaxCall(obj);   	
    });
    
    function performAjaxCall(obj){
    	//sends the object as a json string, retrieves a json object and performs actions based on input
        $.ajax({
        	type : 'post',
            url : 'LoginServlet',
            data : { 
                	loadProds: 1,
                	input: JSON.stringify(obj)
                   },
            dataType: 'JSON',
            success : function(response) {
            	if(response["success"] == "false"){
                 	$('#ajaxGetUserServletResponse').text(response["feedback"]);
                  	$("#ajaxGetUserServletResponse").css({"opacity":"1"});
               	    $("#userNameFeild").css("border-color", "red");
                	$("#passwordFeild").css("border-color", "red");
            	} else {               
            		window.location = "http://localhost:8080/MyAwesomeApp/jsp/UserDashboard.jsp" + '?id=' + response["feedback"];
            	}
            },
            error: function() {
                $('#ajaxGetUserServletResponse').text('An error occurred');
             }
        });
    }
});