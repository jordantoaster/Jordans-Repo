/**
 * 
 */

$(document).ready(function(e) {
	$("#submitButtonLog").on("click", function(e){
		
		e.preventDefault();
		
    	var requestData = [];
    	requestData[0] = $("#passwordFeild").val();
    	requestData[1] = $("#userNameFeild").val();
    		
    	performAjaxRequestServer("login", handleLoginResponse, "GET", requestData);   
	});
});

function handleLoginResponse(outcome){
	if(outcome == "true"){
		window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
	} else {
		//show error message
	}
}