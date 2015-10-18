/**
 * 
 */

$(document).ready(function(e) {
	$("#submitButtonLog").on("click", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[0] = $("#passwordFeild").val();
    	requestData[1] = $("#userNameFeild").val();
    		
    	performAjaxRequestServer("login", handleResponse, "GET", requestData);   
	});
	
	$("#submitButtonReg").on("click", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[2] = $("#passwordFeildReg").val();
    	requestData[1] = $("#passwordFeildConfirmReg").val();
    	requestData[0] = $("#userNameFeildReg").val();
    		
    	performAjaxRequestServer("register", handleResponse, "POST", requestData);   
	});
});

function handleResponse(response){
	json = JSON.parse(response);

	if(json.outcome == "true"){
		window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
	} else {
     	$('#ajaxGetUserServletResponse').text(json.message);
      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});
	}
}