var darwin = darwin || {};

$(document).ready(function(e) {
	
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html?2');
	
	darwin.projectManagerModule.disableTabs();
	
	
	//add to project manager
	var numFeilds = 1;
	
	//load google graph library
	darwin.Mediator.loadGraphLibrary();
	
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
	
	    darwin.projectManagerModule.resetVariables();
	    darwin.projectManagerModule.resetComponents();
	    
	    //contributions - STAGE 1
	    for(i=0;i<5;i++){
	    	
	    	//get parsed url
	    	parsedUrl = darwin.Mediator.parseInputUrl($('#urlField' + i).val());
	    	
	    	//blank check
	    	if(parsedUrl != "/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp" && parsedUrl != "/GitHubRepositoryEvolutionWorkBench/jsp/undefined"){
	    		//set project info for future reference
	    		darwin.projectManagerModule.setProjectNames(parsedUrl);
	    	
	    		//total the num of projects accepted
	    		darwin.projectManagerModule.setNumProjects();
	    		
	    		//set request urls for the specefic api request
	    		darwin.projectManagerModule.setBaseRequestUrl(i, "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=")
	    	} 
	    }
	    
	    //send the urls and associated data to the next module
	    darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseContributionData, "contribution");
	       
	    //Load options for manual pages
	    darwin.projectManagerModule.loadCommitSelection(darwin.projectManagerModule.getProjectNames());
	        	    
	    //activate tabs at the end of the process
    	darwin.projectManagerModule.enableTabs();
	});
	
	$(".icon").on("click.darwin", function(e){  
				
		if(darwin.projectManagerModule.getNumProjects() == 4){
			$("#additionalProject").remove();
		} else {
							
			var feild = '<div  style="margin-top: 0.75%;" class="input-group input-group-lg fields urlInputOne">' + 
			'<span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>' +
			'<input type="text" class="form-control" id="urlField' + numFeilds + '" placeholder="Extra GitHub repository URL" aria-describedby="basic-addon1">' +
			'</div>';
	    
			numFeilds++;
			
			$("#additionalProject").before(feild);
		}
	});
	
	/*remove this and draw components based on drop down not tab*/
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#CustomTab"){
			darwin.Mediator.clearComponents();
			darwin.Mediator.setupCustomComponentsDropDown();
		}// activated tab
	})
});


