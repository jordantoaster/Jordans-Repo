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
				
		darwin.projectManagerModule.setProjectId(parsedUrl);	
	    darwin.projectManagerModule.resetVariables();
	    darwin.projectManagerModule.resetComponents();

	    for(i=0;i<darwin.projectManagerModule.getNumProjects();i++){
	    	parsedUrl = darwin.Facade.parseInputUrl($('#urlField' + i).val());
	    	darwin.projectManagerModule.setBaseRequestUrl(i, "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=1")
	    }
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseContributionData);

    	darwin.projectManagerModule.enableTabs();
	});
	
	$(".icon").on("click.darwin", function(e){  	
		
		if(darwin.projectManagerModule.getNumProjects() == 5){
			$("#additionalProject").remove();
		} else {
		
			//$('#additionalProject').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/InputField.html?3');
		
			var feild = '<div  style="margin-top: 0.75%;" class="input-group input-group-lg fields urlInputOne">' + 
			'<span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>' +
			'<input type="text" class="form-control" id="urlField' + darwin.projectManagerModule.getNumProjects() + '" placeholder="Extra GitHub repository URL" aria-describedby="basic-addon1">' +
			'</div>';
	    
			$("#additionalProject").before(feild);

			darwin.projectManagerModule.setNumProjects();
		}
	});
});


