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
    	
    	darwin.Facade.makeServerRequest("login", darwin.Mediator.authenticateUpdateView, "POST", requestData);
   	});
	
	$("#submitButtonReg").on("click.darwin", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[2] = $("#passwordFeildReg").val();
    	requestData[1] = $("#passwordFeildConfirmReg").val();
    	requestData[0] = $("#userNameFeildReg").val();
    	
    	darwin.Facade.makeServerRequest("register", darwin.Mediator.authenticateUpdateView, "POST", requestData);   		
	});
});