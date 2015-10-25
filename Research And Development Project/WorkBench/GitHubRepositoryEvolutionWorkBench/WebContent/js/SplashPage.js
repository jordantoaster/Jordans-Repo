/**
 * 
 */

//Creates new namespace if not already defined
var darwin = darwin || {};

darwin.handleResponse = function(response){
	json = JSON.parse(response);

	if(json.outcome == "true" && json.action == "login"){
		window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
	} else {
     	$('#ajaxGetUserServletResponse').text(json.message);
      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});
	}
}