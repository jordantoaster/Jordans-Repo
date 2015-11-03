var darwin = darwin || {};

darwin.samplingRate = 13;
darwin.projectId = "";
darwin.comparison = false;

$(document).ready(function(e) {
	
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html?2');
	
	//darwin.disableTabs();
	
	//load google graph library
	darwin.Facade.loadGraphLibrary();
	
	/*USER INPUT CODE BLOCKS - Query Page*/
	/*Handles url input*/
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		
		//parse the url
		parsedUrl = darwin.Facade.parseInputUrl($("#urlField").val());
		
		//get the project identifier
		darwin.projectId = parsedUrl;
		
		//reset the contribution variables
	    darwin.Facade.resetContributionVariables();
	 
	    /*use this to change starting variable, so isnt affected by reset*/
	    //darwin.samplingRate = 13;

	    //reset the progress bar
		$('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);    
		
		
		//set the initial request url		
        baseRequestUrl = "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page="+darwin.responsePage;
        
        //darwin.Mediator.githubParseContributionData
        darwin.Facade.makeGithubRequest(baseRequestUrl, "GET", darwin.Mediator.githubParseContributionData)
	});
	
	$(".icon").on("click.darwin", function(e){  	
		$("#additionalProject").empty();
		$('#additionalProject').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/InputField.html?2');
		darwin.comparison = true;
	});
});


