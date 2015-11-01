$(document).ready(function(e) {
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html?2');
	
	
	//darwin.disableTabs();
	darwin.Facade.loadGraphLibrary();
	
	/*USER INPUT CODE BLOCKS - Query Page*/
	/*Handles url input*/
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		parsedUrl = darwin.Facade.parseInputUrl($("#urlField").val());
		
		/*contributution variables*/
	    darwin.resetVariables();
		$('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);    
				
        baseRequestUrl = "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page="+darwin.responsePage;
        
        //darwin.Mediator.githubParseContributionData
        darwin.Facade.makeGithubRequest(baseRequestUrl, "GET", darwin.Mediator.githubParseContributionData)
	});
});


