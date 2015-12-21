var darwin = darwin || {};

$(document).ready(function(e) {
	
    $('.nav-tabs a').click(function () {
        var href = $(this).attr('href');
        var elem = $('a[href="' + href + '"]').tab('show');
    });
		
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
	    	
	    		//CHECK HERE IF ANY ARE THE SAME URL INPUT
	    		
	    		//set request urls for the specefic api request
	    		darwin.projectManagerModule.setBaseRequestUrl(darwin.projectManagerModule.getNumProjects(), "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=")
	    	
	    		//total the num of projects accepted
	    		darwin.projectManagerModule.setNumProjects();
	    		
	    		} 
	    }
	    
	    //send the urls and associated data to the next module
	    darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseContributionData, "contribution","");
	       
	    //Load options for manual pages
	    darwin.projectManagerModule.loadProjectSelection(darwin.projectManagerModule.getProjectNames());
	        	    
	    //activate tabs at the end of the process
    	darwin.projectManagerModule.enableTabs();
	});
	
	$(".icon").on("click.darwin", function(e){  
				
		if(numFeilds == 5){
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
	
	$("#selectInput").on("click.darwin", function(e){  
		$("#urlContainer").removeClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
	});
	$("#selectVisualiser").on("click.darwin", function(e){  
		$("#visualiserContainer").removeClass('hidden');
		$("#urlContainer").addClass('hidden');
		$("#statContainer").addClass('hidden');
	});
	$("#selectStats").on("click.darwin", function(e){  
		$("#statContainer").removeClass('hidden');
		$("#visualiserContainer").addClass('hidden');
		$("#urlContainer").addClass('hidden');
	});
	$("#selectPrediction").on("click.darwin", function(e){  

	});
	
	/*remove this and draw components based on droop down not tab*/
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#CustomTab"){
			darwin.Mediator.clearComponents();
			darwin.Mediator.setupCustomComponentsDropDown("custom");
		}// activated tab
	})
});


