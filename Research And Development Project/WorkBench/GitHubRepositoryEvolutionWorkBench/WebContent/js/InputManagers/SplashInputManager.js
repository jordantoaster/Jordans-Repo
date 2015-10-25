/**
 * 
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	$("#submitButtonLog").on("click.darwin", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[0] = $("#userNameFeild").val();
    	requestData[1] = $("#passwordFeild").val();
    		
    	darwin.performAjaxRequestServer("login", darwin.handleResponse, "POST", requestData);   
	});
	
	$("#submitButtonReg").on("click.darwin", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[2] = $("#passwordFeildReg").val();
    	requestData[1] = $("#passwordFeildConfirmReg").val();
    	requestData[0] = $("#userNameFeildReg").val();
    		
    	darwin.performAjaxRequestServer("register", darwin.handleResponse, "POST", requestData);   
	});
});