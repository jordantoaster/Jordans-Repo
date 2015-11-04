var darwin = darwin || {};

$(document).ready(function(e) {
	
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html?2');
	
	darwin.projectManagerModule.disableTabs();
	
	//load google graph library
	darwin.Facade.loadGraphLibrary();
	
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		
		//parse the url
		parsedUrl = darwin.Facade.parseInputUrl($("#urlField").val());
		
		darwin.newQuery = true;
		
		darwin.projectManagerModule.setProjectId(parsedUrl);	
	    darwin.projectManagerModule.resetVariables();
	    darwin.projectManagerModule.resetComponents();
	    
	    if(darwin.projectManagerModule.getComparison() == false){
	    	darwin.projectManagerModule.setBaseRequestUrl("https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page="+1);
	        darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getBaseRequestUrl(), "GET", darwin.Mediator.githubParseContributionData, "")
	    } else {
			parsedUrlTwo = darwin.Facade.parseInputUrl($("#urlFieldTwo").val());
	    	darwin.projectManagerModule.setBaseRequestUrl("https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page="+1);
	    	darwin.projectManagerModule.setBaseRequestUrlTwo("https://api.github.com/repos"+parsedUrlTwo+"/stats/code_frequency?per_page=100&page="+1);
	        darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getBaseRequestUrl(), "GET", darwin.Mediator.githubParseContributionData,darwin.projectManagerModule.getBaseRequestUrlTwo());
	    }	   
        //when complete allow tab click
    	darwin.projectManagerModule.enableTabs();
	});
	
	$(".icon").on("click.darwin", function(e){  	
		$("#additionalProject").empty();
		$('#additionalProject').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/InputField.html?2');
		darwin.projectManagerModule.setComparison(true);
	});
});


