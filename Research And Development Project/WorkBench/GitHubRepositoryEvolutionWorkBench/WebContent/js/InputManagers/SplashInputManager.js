/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	$("#submitButtonLog").on("click.darwin", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[0] = $("#userNameFeild").val();
    	requestData[1] = $("#passwordFeild").val();
    	
    	darwin.Mediator.makeServerRequestSplash("login", darwin.Mediator.authenticateUpdateView, "POST", requestData);
   	});
	
	$("#submitButtonReg").on("click.darwin", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[2] = $("#passwordFeildReg").val();
    	requestData[1] = $("#passwordFeildConfirmReg").val();
    	requestData[0] = $("#userNameFeildReg").val();
    	
    	darwin.Mediator.makeServerRequestSplash("register", darwin.Mediator.authenticateUpdateView, "POST", requestData);   		
	});
});