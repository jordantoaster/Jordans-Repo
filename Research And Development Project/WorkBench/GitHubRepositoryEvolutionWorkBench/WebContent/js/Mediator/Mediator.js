/**
 * @author Jordan McDonald
 *
 * Description - Acts as the controller between every module on the system - modules do not directly talk to one another and interact through this object
 * 				 The mediator may perform additional logic in between each module
 * 				 acts as the glue between the different components
 */

//defines a namespace
var darwin = darwin || {};

//define a module in the namespace
darwin.Mediator = (function () {
	
	var outhtml ="";
	
    return {
    	//prepares the automated bulk process
    	initialSetupBulk : function(){
    	    darwin.projectManagerModule.resetVariables();
    	    darwin.projectManagerModule.resetComponents();
    	    
    	    //get urls
	    	bulkUrls = $('#urlField0').val();
	    	
	    	if(bulkUrls != ""){
	    		bulkUrls = bulkUrls.replace(/\s+/g, '');
	    	
	    		//split on comma to an array
	    		var bulkProjects = [];
	    		bulkProjects = bulkUrls.split(',');
	    		    	
	    		//iterates all the projects added and processes each
	    		for(var i=0; i<bulkProjects.length;i++){
	    		
	    			parsedUrl = darwin.Mediator.parseInputUrl(bulkProjects[i]);

	    			darwin.projectManagerModule.setProjectNames(parsedUrl);

	    			darwin.projectManagerModule.setBaseRequestUrl(darwin.projectManagerModule.getNumProjects(), "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=")

	    			darwin.projectManagerModule.setNumProjects();
	    		    		
	    		}
	    	
	    		darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseContributionData, "contribution","");
	    	}
	    	else {
		    	$('#ajaxGetUserServletResponse').text("Ensure at least one URL is added!");
		    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	
		    	setTimeout(function(){
		            $('#ajaxGetUserServletResponse').css('opacity','0');
		    	}, 5000);
	    	}
        	//darwin.projectManagerModule.enableTabs();

    	},
    	//performs a redirect
    	handleLogout : function(){	
			window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/SplashPage.jsp";
    	},
    	//responds with export status
    	handleExport : function(response){	
			    $('#ajaxGetUserServletResponse').text(response);
  			    $("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
		    	setTimeout(function(){
		            $('#ajaxGetUserServletResponse').css('opacity','0');
		    	}, 5000);
    	},
    	initialSetup : function(filled){
    	    darwin.projectManagerModule.resetVariables();
    	    darwin.projectManagerModule.resetComponents();
    	    
    	    for(i=0;i<filled.length;i++){
    	    	
    	    	//get parsed url
    	    	parsedUrl = darwin.Mediator.parseInputUrl($('#urlField' + filled[i]).val());
    	    	
    	    	//set project info for future reference
    	    	darwin.projectManagerModule.setProjectNames(parsedUrl);
    	    	    	    		
    	    	//set request urls for the specefic api request
    	    	darwin.projectManagerModule.setBaseRequestUrl(darwin.projectManagerModule.getNumProjects(), "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=")
    	    	
    	    	//total the num of projects accepted
    	    	darwin.projectManagerModule.setNumProjects();
    	    		 
    	    }
    	    
    	    //send the urls and associated data to the next module
    	    darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseContributionData, "contribution","");
    	    
    	    //Load options for manual pages
    	    darwin.projectManagerModule.loadProjectSelection(darwin.projectManagerModule.getProjectNames());
    	    
    	    //start project info process
    	    darwin.Mediator.getProjectInfo();
    	        
    	    //if(darwin.projectManagerModule.getIsAuto() == false){
    	    //activate tabs at the end of the process
        	darwin.projectManagerModule.enableTabs();
    	    // }
    	},
    	//gets additional project data
        getProjectInfo : function(){
    		projectNames = darwin.projectManagerModule.getProjectNames();
    		project = projectNames[0];

			darwin.githubModule.send("https://api.github.com/repos" + project + "/readme?type=extra", darwin.AjaxResponseModule.handleSuccess, 0, "extraInfo");
        },
    	prepareModal : function(projectNum){
    		
    		//get modal data for the number
    		projectNames = darwin.projectManagerModule.getProjectNames();
    		projectName = projectNames[projectNum];
    		
    		if(projectName != undefined){
    			bodyText = darwin.dataManager.getReadMe(projectNum);
		
    			//send to visualiser
    			darwin.modalVisualiser.drawModal(projectName, bodyText);
    		} else {
		    	$('#ajaxGetUserServletResponse').text("No project data added!");
		    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	
		    	setTimeout(function(){
		            $('#ajaxGetUserServletResponse').css('opacity','0');
		    	}, 5000);
    		}

    	},
    	//exracts useful info from user response and displays
    	parseUserData : function(json, url, username){
    		
    	      if(json.message == "Not Found" || username == '') {
    	          $('#ghapidata').html("<h2>No User Info Found</h2>");
    	        }
    	        
    	        else {
    	          // else we have a user and we display their info
    	          var fullname   = json.name;
    	          var username   = json.login;
    	          var aviurl     = json.avatar_url;
    	          var profileurl = json.html_url;
    	          var location   = json.location;
    	          var followersnum = json.followers;
    	          var followingnum = json.following;
    	          var reposnum     = json.public_repos;
    	        }
    	      
    	      //draw data
    	      outhtml = '<h2>'+username+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
    	      outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="160" height="160" alt="'+username+'"></a></div>';
    	      outhtml = outhtml + '<p class="largeText">Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
    	      outhtml = outhtml + '<div class="repolist clearfix">';
    	       	      
    	      //make repo call
    	      url = 'https://api.github.com/users/'+username+'/repos?type=repo';
    	      
  			  darwin.projectManagerModule.resetBaseRequestUrl();
  		    
  			  darwin.projectManagerModule.setBaseRequestUrl(0,url);
  	
  			  darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.parseRepoData, "user", 0);		
    	      
    	},
    	//evaluates user reps and displays info on each
    	parseRepoData : function(repositories){
            if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
            else {
              outhtml = outhtml + '<p class="largeText"><strong>Repos List:</strong></p>';
            	  $.each(repositories, function(index) {
            		  outhtml = outhtml + '<a class="repoPill" href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a>';
            	  });
       
              outhtml = outhtml + '</div>'; 
            }
  	      $('#userContent').html(outhtml);
    	},
    	//adjusts the slider
    	contribSliderVals : function(start, end){
    		darwin.dataManager.setContribSlider(start, end);
    	}, 
    	//the next series of functions make varying api requests
    	makeServerRequestSplash: function (action, callback, type, input) {
    		darwin.serverModule.sendSplash(action, callback, type, input);
        },
        makeServerRequestContributions : function(action,callback,type,additions, deletions, difference, LOCOverTime, contributionDates, project){
        	darwin.serverModule.sendContributions(action,callback,type,additions, deletions, difference, LOCOverTime, contributionDates, project);
        },
        makeServerRequestGeneric : function(action, subAction, callback,type,data,datesAsString, project){
        	darwin.serverModule.sendGeneric(action,subAction,callback,type,data, datesAsString, project);
        },
		authenticateUpdateView: function (response) {
			json = JSON.parse(response);

			if(json.outcome == "true" && json.action == "login"){
				window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
			} else {
		     	$('#ajaxGetUserServletResponse').text(json.message);
		      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});
		    	setTimeout(function(){
		            $('#ajaxGetUserServletResponse').css('opacity','0');
		    	}, 5000);
			}
		},
		updateProgressBar: function () {
    	    if(darwin.projectManagerModule.getIsAuto() == false){
    	    	darwin.progressbarModule.updateProgressBar();
    	    }
		},
		//draws statistical data based on the type
		drawGenericStat : function(data, projectNames, metricType){
			
			if(metricType == "mean"){
			    obj = JSON.parse(data);
			    var parsedData = [];
			    var parsedMedian = [];
			    
				//sort the response
				var sortedData = obj.means.split('*');
				var collatedMean = obj.collatedMean;
				var standardDev = obj.standardDev;
				var medians = obj.medians.split('*');
				var collatedMedian = obj.collatedMedian;
				
				for(var i = 0; i<sortedData.length; i++){
					if(sortedData[i] != ""){
						parsedData[i] = parseInt(sortedData[i]);
					}
				}
				for(var i = 0; i<medians.length; i++){
					if(medians[i] != ""){
						parsedMedian[i] = parseInt(medians[i]);
					}
				}
				
				darwin.statVisualiser.drawMean(parsedData, projectNames, metricType, collatedMean, standardDev, sortedData, parsedMedian, collatedMedian);
			}
			if(metricType == "growth"){
			    obj = JSON.parse(data);
			    var parsedData = [];
			    
			    parsedData = obj.growthRate.split('*');
			    
			    //var growthRate = obj.growthRate;
			    var absolute = obj.absoluteGrowthRate;
			    var overTime = obj.growthRateOverTime;
			    
				darwin.statVisualiser.drawGrowth(parsedData, projectNames, metricType, absolute, overTime);
				
				//only runs when auto getting data 
	    	    if(darwin.projectManagerModule.getIsAuto() == true){
					darwin.projectManagerModule.handleAuto(metricType, darwin.projectManagerModule.getNumProjects()-1);
				}
			}
			if(metricType == "normality"){
			    obj = JSON.parse(data);
			    var wilks = obj.wilks;
			    var allWilks = obj.all;

				darwin.statVisualiser.writeNormality(wilks, projectNames, metricType, allWilks);
			}
			if(metricType == "variance"){
			    obj = JSON.parse(data);
			    var variance = obj.variance;
			    var allVar = obj.allVar;

				darwin.statVisualiser.writeVariance(variance, projectNames, metricType, allVar);
			}

		},
		//make a API reeuest based on the input
		makeGithubRequest: function (url, callback, action, projectIndex) {
				
			//if not a stat api dataset then perform one manual call
			if(action == "commit"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			}
			else if(action == "user"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			}
			else if(action == "star"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			}
			else if(action == "watcher"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			}
			else if(action == "fork"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			}
			else if(action == "tags"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			}
			else if(action == "Issues"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, projectIndex, action);
			} else if(action == "comments") {
				darwin.githubModule.send(url[0], callback, projectIndex, action);
			} else {
				//if a stat api then loop each url, only send true callback on final url
	    		projectNames = darwin.projectManagerModule.getProjectNames();
				
	    		//for(i=0;i<url.length;i++){
					
					
					name = projectNames[0];
					index = darwin.Mediator.getProjNameIndex(name);
									
					//only perform actually call back when all request data collected
					//if(i==(url.length-1)){
					 //   setTimeout('', 50);
						darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, index, action);
					//} else {
					//    setTimeout('', 50);
					//	darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), callback, index, action);					
					//}	
				//}
			}
		},
		githubParseContributionData: function (response, index) {
			darwin.contributionExtractorModule.extract(response, index);
		},
		githubParseGenericData: function (response, index, action, supplement) {
			darwin.genericExtractorModule.extract(response, index, action, supplement);
		},
		githubParseStarData: function (response, index) {
			darwin.starExtractorModule.extract(response, index);
		},
		drawContributionGraph: function (values, xAxis, chartTitle, LOC, totalLines, sampleIndex, chartType, projectNames) {	
			
			darwin.ContributionVisualiser.draw(values, xAxis, chartTitle, sampleIndex, chartType,projectNames);	
			
			if(values.length == 1){
				//darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		drawGenericGraph: function (values, xAxis, chartTitle, sampleIndex, action, chartType) {
			//move on data but add project names
			darwin.genericVisualiser.draw(values, xAxis, chartTitle, sampleIndex, action, chartType, darwin.projectManagerModule.getProjectNames());	
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		//resets the system for new url input
		resetVariables: function(){
			darwin.projectManagerModule.resetProjectNames();
			darwin.projectManagerModule.resetNumProjects();
			darwin.dataManager.resetAllDataManager();
			darwin.projectManagerModule.resetCommitProjectsAdded();
			darwin.projectManagerModule.resetStarProjectsAdded();
			darwin.projectManagerModule.setSampleIndex(0);
			darwin.jsonManagerModule.resetAllData();
			darwin.contributionExtractorModule.resetVariables();
			darwin.projectManagerModule.resetAllProjectManager();
			darwin.customTabModule.resetCustomTabData();
			darwin.progressbarModule.reset();
		},
		resampleCommits : function(currentJson){
			//pass in commits one at a time
			for(var i =0; i<currentJson.length;i++){
				darwin.genericExtractorModule.extract(currentJson[i],i);
			}
		},
		//extracts project name from the url
		parseInputUrl : function(url){
			return darwin.ParseUrlInputModule.parse(url);
		},
		//organising data for sending
		packager : function(seriesA, SeriesB, seriesC, seriesD ,dataType){
			if(dataType == "contributions"){
				darwin.packager.contributions(seriesA, SeriesB, seriesC,seriesD);
			}
		},
		packagerGeneric : function(dates, commits,projectname, action){
			darwin.packager.generic(dates, commits,projectname, action);
		},
		emptyCallback : function(){
			
		},
		//sets data in the data manager based on the inputs
		setGenericAcc : function(index, genericAcc, action, sampleIndex){
			if(action == "commit"){
				darwin.dataManager.setCommitsAcc(index, genericAcc, sampleIndex);
			}    
			if(action == "star"){
				darwin.dataManager.setStarsAcc(index, genericAcc, sampleIndex);
			}
  			if(action == "fork"){
  				darwin.dataManager.setForksAcc(index, genericAcc, sampleIndex);
			}
  			if(action == "tags"){
  				darwin.dataManager.setTagsAcc(index, genericAcc, sampleIndex);
			}
  			if(action == "Issues"){
  				darwin.dataManager.setIssuesAcc(index, genericAcc, sampleIndex);
  			}
		},
		//sets all the contribution data
		setContributionDetails: function(index, additions, deletions, difference, LOCOverTime, sampleIndex, contributionDates, additionsAcc, deletionsAcc){
			darwin.dataManager.setAdditions(index, additions, sampleIndex);
			darwin.dataManager.setDeletions(index, deletions, sampleIndex);
			darwin.dataManager.setDifference(index, difference, sampleIndex);
			darwin.dataManager.setLOCOverTime(index, LOCOverTime, sampleIndex);	
			darwin.dataManager.setContributionDates(index, contributionDates, sampleIndex);
			darwin.dataManager.setAdditionsAcc(index, additionsAcc, sampleIndex);
			darwin.dataManager.setDeletionsAcc(index, deletionsAcc, sampleIndex)
		},
		//The following functions perform the role of setting and getting data in the data manager
		setCommitDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setCommits(index, commits, projectNames, sampleIndex);
		},
		setStarDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setStars(index, commits, projectNames, sampleIndex);
		},
		setForkDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setForks(index, commits, projectNames, sampleIndex);
		},
		setTagsDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setTags(index, commits, projectNames, sampleIndex);
		},
		setIssuesDetails : function(index, commits, projectNames, sampleIndex, open, closed){
			darwin.dataManager.setIssues(index, commits, projectNames, sampleIndex, open, closed);
		},
		setClosedAtIssuesDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setClosedAtIssues(index, commits, projectNames, sampleIndex);
		},
		setIssueCommentsDetails : function(index, data, projectNames, sampleIndex){
			darwin.dataManager.setIssueComments(index, data, projectNames, sampleIndex);
		},
		getCommitDetails : function(){
			return darwin.dataManager.getCommits();
		},
		getStarDetails : function(){
			return darwin.dataManager.getStars();
		},
		getForkDetails : function(){
			return darwin.dataManager.getForks();
		},
		getTagsDetails : function(){
			return darwin.dataManager.getTags();
		},
		getIssuesDetails : function(){
			return darwin.dataManager.getIssues();
		},
		setNumCommitProjectSelected : function(){
			darwin.projectManagerModule.setCommitProjectsAdded(darwin.Mediator.getNumCommitProjectSelected + 1);
		},
		getNumCommitProjectSelected : function(){
			return darwin.projectManagerModule.getCommitProjectsAdded();
		},
		getNumStarProjectSelected : function(){
			return darwin.projectManagerModule.getStarProjectsAdded();
		},
		setNumStarProjectSelected : function(){
			darwin.projectManagerModule.setStarProjectsAdded();
		},
		setNumIssuesProjectSelected : function(){
			darwin.projectManagerModule.setIssuesProjectsAdded();
		},
		getNumWatcherProjectSelected : function(){
			return darwin.projectManagerModule.getWatcherProjectsAdded();
		},
		getNumForkProjectSelected : function(){
			return darwin.projectManagerModule.getForkProjectsAdded();
		},
		getNumTagsProjectSelected : function(){
			return darwin.projectManagerModule.getTagsProjectsAdded();
		},
		setNumWatcherProjectSelected : function(){
			darwin.projectManagerModule.setWatcherProjectsAdded();
		},
		setNumForkProjectSelected : function(){
			darwin.projectManagerModule.setForkProjectsAdded();
		},
		setNumTagsProjectSelected : function(){
			darwin.projectManagerModule.setTagsProjectsAdded();
		},
		getSmallestArray : function(json){
			return darwin.arrayUtilityModule.getSmallestArray(json);
		},
		performSuccessAction : function(action, response, callback, index){
			darwin.AjaxResponseModule.handleSuccess(action, response, callback, index, false);
		},
		setContributionJson : function(index, response){
			darwin.jsonManagerModule.setContributionJson(index,response)
		},
		setCommitJson : function(index, response){
			darwin.jsonManagerModule.setCommitJson(index,response)
		},
		setStarJson : function(index, response){
			darwin.jsonManagerModule.setStarJson(index,response)
		},
		setWatcherJson : function(index, response){
			darwin.jsonManagerModule.setWatcherJson(index,response)
		},
		resetcurrRequestPage : function(index){
			darwin.projectManagerModule.resetcurrRequestPage(index);
		},
		getAllCommitJson : function(){
			return darwin.jsonManagerModule.getAllCommitJson()
		},
		getIndexCommitJson : function(index){
			return darwin.jsonManagerModule.getCommitJson(index)
		},
		getStarJson : function(){
			return darwin.jsonManagerModule.getStarJson()
		},
		getIndexStarJson : function(index){
			return darwin.jsonManagerModule.getIndexStarJson(index)
		},
		getIndexForkJson : function(index){
			return darwin.jsonManagerModule.getIndexForkJson(index)
		},
		getIndexCommentJson : function(index){
			return darwin.jsonManagerModule.getIndexCommentJson(index)
		},
		getIndexIssuesJson : function(index){
			return darwin.jsonManagerModule.getIndexIssues(index)
		},
		getIndexWatcherJson : function(index){
			return darwin.jsonManagerModule.getIndexWatcherJson(index)
		},
		getWatcherJson : function(){
			return darwin.jsonManagerModule.getWatcherJson()
		},
		getForkJson : function(){
			return darwin.jsonManagerModule.getForkJson()
		},
		getTagsJson : function(){
			return darwin.jsonManagerModule.getTagsJson()
		},
		setForkJson : function(index, response){
			darwin.jsonManagerModule.setForkJson(index,response)
		},
		setCommentJson : function(index, response){
			darwin.jsonManagerModule.setCommentJson(index,response)
		},
		setTagsJson : function(index, response){
			darwin.jsonManagerModule.setTagsJson(index,response)
		},
		issuesCount : function(array){
			var issuesCount = 0;
			for(var i=0; i<array.length;i++){
				
				if(array[i].pull_request == null){
					issuesCount++;
				}
			}
			
			return issuesCount;
		},
		//filter out pulls from issues
		removePullRequests : function(array){
			var filteredArray = [];
			var filterCounter = 0;
			for(var i=0; i<array.length;i++){
				
				if(array[i].pull_request == null){
					filteredArray[filterCounter] = array[i];
					filterCounter++;
				}
			}
			return filteredArray;
		},
		setIssuesJson : function(index, response){		
			darwin.jsonManagerModule.setIssuesJson(index,response)
		},
		getTagsJson : function(index){
			return 	darwin.jsonManagerModule.getTagsJson(index);
		},
		setcurrRequestPage : function(val){
			darwin.projectManagerModule.setcurrRequestPage(val);
		},
		getcurrRequestPage : function(){
			return darwin.projectManagerModule.getcurrRequestPage();
		},
		getAllBaseRequestUrl : function(index){
			return darwin.projectManagerModule.getAllBaseRequestUrl(index)
		},
		makeGithubRequestSingleUrl : function(url, callback, index, action){
			  darwin.githubModule.send(url, callback, index, action);
		},
		//The following functions set up the process to get the data specefied for the input url
		prepareCommitClick : function(url, projectName){
			darwin.jsonManagerModule.resetCommitJson(url);
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.Mediator.disableCommitButton();
			
			index = darwin.Mediator.getProjNameIndex(projectName);
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "commit", index);		
		},
		prepareUserClick : function(username){
			
			if(username != "" && username != undefined){
				darwin.projectManagerModule.resetBaseRequestUrl();

				var requri   = 'https://api.github.com/users/'+username+"?type=user";
				var repouri  = 'https://api.github.com/users/'+username+'/repos';
		    
				darwin.projectManagerModule.setBaseRequestUrl(0,requri);
	
				darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.parseUserData, "user", username);
			} else {
		    	$('#ajaxGetUserServletResponse').text("Make sure you add a username!");
		    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	
		    	setTimeout(function(){
		            $('#ajaxGetUserServletResponse').css('opacity','0');
		    	}, 5000);
			}
		},
		prepareStarClick : function(url, projectName){
			darwin.jsonManagerModule.resetStarJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableStarButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "star", index);		
		},
		prepareCollabClick : function(url, projectName){
			darwin.jsonManagerModule.resetCollabJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableStarButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "collab", index);		
		},
		prepareWatcherClick : function(url, projectName){
			darwin.jsonManagerModule.resetWatcherJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableWatcherButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "watcher", index);		
		},
		prepareForkClick : function(url, projectName){
			darwin.jsonManagerModule.resetForkJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableForkButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "fork", index);		
		},
		prepareIssuesClick : function(url, projectName){
			darwin.jsonManagerModule.resetIssuesJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableIssuesButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "Issues", index);		
		},
		prepareTagsClick : function(url, projectName){
			darwin.jsonManagerModule.resetTagsJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableTagsButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "tags", index);		
		},
		//gets the index based on the name
		getProjNameIndex : function(name){
			var names = darwin.projectManagerModule.getProjectNames();
			var index = 0;
			
			for(var i =0;i<names.length;i++){
				if(names[i] == name){
					break;
				} else {
					index++;
				}
			}
			return index
		},
		//supplements tag data by getting the dates
		getTagDate : function(sha, index){
			var projectList = darwin.projectManagerModule.getProjectNames();
			var project = projectList[index];
			var commit = darwin.githubModule.send("https://api.github.com/repos"+project+"/commits/"+sha+"", darwin.projectManagerModule.noCallBack, index, "tagCommit")			
		
			return darwin.ISO601toDateModule.convert(commit.commit.committer.date);		
		},
		disableCommitButton : function(){
			darwin.projectManagerModule.disableCommitButton();
		},
		enableButtons : function(){
			darwin.projectManagerModule.enableButtons();
		},
		setupCustomComponentsOptions : function(){
			darwin.customTabModule.setupUiOptions();
		},
		setupCustomComponentsDropDown : function(type){
			if(type =="custom"){
				darwin.customTabModule.setupUiDropDown();
			} else if (type=="mean"){
				darwin.projectManagerModule.setupMeanUi();
			}
		},
		clearComponents : function(){
			darwin.customTabModule.clearComponents();
		},
		clearOptionsOnly : function(){
			darwin.customTabModule.clearOptionsOnly();
		},
		getCommitsIndex : function(index){
			return darwin.dataManager.getCommitsIndex(index);
		},
		getStarsIndex : function(index){
			return darwin.dataManager.getStarsIndex(index);
		},
		getForksIndex  : function(index){
			return darwin.dataManager.getForksIndex(index);
		},
		getTagsIndex : function(index){
			return darwin.dataManager.getTagsIndex(index);
		},
		getIssuesIndex : function(index){
			return darwin.dataManager.getIssuesIndex(index);
		},
		getAdditionsIndex : function(index){
			return darwin.dataManager.getAdditions(index);
		},
		getDeletionsIndex : function(index){
			return darwin.dataManager.getDeletions(index);
		},
		getLOCIndex : function(index){
			return darwin.dataManager.getLOCOverTime(index);
		},
		addToCustomList : function(array, name){
			darwin.dataManager.addToCustomList(array);
			darwin.dataManager.addToCustomNameList(name);
		},
		drawCustomGraph: function (values, xAxis, chartTitle, sampleIndex, chartType) {			
			if(values.length == 0){
		    	$('#ajaxGetUserServletResponse').text("Please Select a check box");
		    	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
		    	setTimeout(function(){
		            $('#ajaxGetUserServletResponse').css('opacity','0');
		    	}, 5000);
			} else {
				darwin.customVisualiser.draw(values, xAxis, chartTitle, sampleIndex, chartType);	
			}
		},
		resetCustomProcess : function(){
			darwin.dataManager.clearCustomNameList();
			darwin.customTabModule.removeChecks();
		},
		resetCustomList: function(){
			darwin.dataManager.clearCustomList();
		},
		setCurrentCustomSearch : function(val){
			darwin.customTabModule.setIsOnCustom(val);
		},
		getCurrentCustomSearch : function(){
			return darwin.customTabModule.getIsOnCustom();
		},
		copyObject : function(obj){
			return darwin.copyObjectModule.copyObject(obj);
		},
		updateCommitProgress : function(val){
			darwin.progressbarModule.updateCommitProgress(val);
		},
		updateStarProgress : function(val){
			darwin.progressbarModule.updateStarProgress(val);
		},
		updateWatcherProgress : function(val){
			darwin.progressbarModule.updateWatcherProgress(val);
		},
		updateForkProgress : function(val){
			darwin.progressbarModule.updateForkProgress(val);
		},
		updateIssuesProgress : function(val){
			darwin.progressbarModule.updateIssuesProgress(val);
		},
		updateTagsProgress : function(val){
			darwin.progressbarModule.updateReleaseProgress(val);
		},
		getChartType : function(){
			return darwin.projectManagerModule.getChartType();
		},
		setChartType : function(val){
			darwin.projectManagerModule.setChartType(val);
		},
		setIssuesType : function(val){
			darwin.projectManagerModule.setIssuesType(val);
		},
		supplementTagData : function(callback, action, index){
			tagData = darwin.Mediator.getTagsJson(index);
			
			if(tagData != undefined){
				darwin.projectManagerModule.setSupplmentSize(tagData.length); 
				darwin.Mediator.makeGithubRequestSingleUrl("https://api.github.com/repos"+darwin.projectManagerModule.getProjectNamesIndex(index)+"/commits/"+tagData[darwin.Mediator.getTagSuppIndex()].commit.sha+"?type=tagSupp", callback, index, "tagSupplement");
			} else {
				darwin.projectManagerModule.handleAuto(action, index);
			}
		},
		setSupplementTag : function(value, index){
			darwin.jsonManagerModule.setSupplementTag(value, index);
		},
		getTagSuppIndex : function(){
			return darwin.projectManagerModule.getTagSuppIndex();
		},
		setTagSuppIndex : function(){
			darwin.projectManagerModule.setTagSuppIndex();
		},
		resetTagSuppIndex : function(){
			darwin.projectManagerModule.resetTagSuppIndex();
		},
		getSupplementTag : function(){
			return darwin.jsonManagerModule.getSupplementTag();
		}, 
		targetSupplementSize : function(){
			return darwin.projectManagerModule.getSupplementSize();
		},
		//sorts the dates into ascending order
		sortSuppDataDates : function(index){
			
			(function(){
				  if (typeof Object.defineProperty === 'function'){
				    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
				  }
				  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

				  function sb(f){
				    for (var i=this.length;i;){
				      var o = this[--i];
				      this[i] = [].concat(f.call(o,o,i),o);
				    }
				    this.sort(function(a,b){
				      for (var i=0,len=a.length;i<len;++i){
				        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
				      }
				      return 0;
				    });
				    for (var i=this.length;i;){
				      this[--i]=this[i][this[i].length-1];
				    }
				    return this;
				  }
				})();
			
			var data = darwin.Mediator.getSupplementTag(index);
			var dateArray = [];
			
			for(var i=0;i<data.length;i++){
				dateArray[i] = darwin.ISO601toDateModule.convert(data[i].commit.committer.date);
			}
			
			dateArray.sortBy(function(o){ return o.date });
			
			return dateArray;
			
		},
		getCheckedMeanData : function(dataType){
			darwin.projectManagerModule.getCheckedMeanData(dataType);
		},
		getCheckedNormalityData : function(dataType){
			darwin.projectManagerModule.getCheckedNormalityData(dataType);
		},
		getCheckedVarianceData : function(dataType){
			darwin.projectManagerModule.getCheckedVarianceData(dataType);
		},
		getCheckedGrowthData : function(dataType){
			darwin.projectManagerModule.getCheckedGrowthData(dataType);
		},
		getCheckedCorrelationsData : function(seriesOne, seriesTwo){
			darwin.projectManagerModule.getCheckedCorrelationsData(seriesOne, seriesTwo);
		},
		drawCorrelation : function(correlation, projects, autoIndex, subAction){
			darwin.statVisualiser.writeCorrelations(correlation, projects);
			
    	    if(darwin.projectManagerModule.getIsAuto() == true){
				darwin.projectManagerModule.handleAuto(subAction, autoIndex);
			}
		},
		prepareIssueComment : function(index, url, projectName){
			darwin.jsonManagerModule.resetCommentJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableIssuesButton();
			
			index = darwin.Mediator.getProjNameIndex(projectName);
			
			url = url + "/" + darwin.dataManager.getIndexIssueComments(index) + "/comments?type=comment";
			darwin.projectManagerModule.setBaseRequestUrl(0,url);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "comments", index);		
		
		},
		storeIssueNumbers : function(json, index){
			issueNumbers = [];
			
			for(var i =0; i<json.length;i++){
				issueNumbers[i] = json[i].number;
			}
			
			darwin.dataManager.setIssueNumbers(index,issueNumbers);
		},
		//the following functions handle the law responses from the server
		handleLawData : function(response){
			
			//parse laws
		    obj = JSON.parse(response);
		    var HpThree =[];
		    
			//sort the responses
		    var hpOne = obj.hpOne;
			var hpTwo = obj.hpTwo;
			HpThree[0] = obj.hpThreeI;
			HpThree[1] = obj.hpThreeA;
			HpThree[2] = obj.hpThreeD;
			var HpFour = obj.hpFour;
			var hpFive = obj.hpFive;
			var hpSix = obj.hpSix;
			var hpSeven = obj.hpSeven;
			
			//pass for drawing
			darwin.statVisualiser.drawLaws(hpOne,hpTwo,HpThree,HpFour,hpFive,hpSix,hpSeven);
		},
		
		handleLawOneData : function(response){
			 obj = JSON.parse(response);
			 var allCorr = obj.crossPercent.split(',');

	    	  for(var i=0; i<allCorr.length;i++){
	    		  allCorr[i] = allCorr[i].replace('[', '');
	    		  allCorr[i] = allCorr[i].replace(']', '');
	    	  }
				
	    	  darwin.lawVisualiser.drawLawOne(allCorr);
		},
		handleLawTwoData : function(response){
		    obj = JSON.parse(response);

	    	darwin.lawVisualiser.drawLawTwo(obj.numPos, obj.numNeg);

		},
		handleLawThreeData : function(response){
		    obj = JSON.parse(response);

	    	darwin.lawVisualiser.drawLawThree(obj.additions, obj.deletions, obj.issues);
		},
		handleLawFourData : function(response){
			
		    obj = JSON.parse(response);
		    
			 var variance = obj.vari.split(',');
			 var sd = obj.sd.split(',');

	    	  for(var i=0; i<variance.length;i++){
	    		  variance[i] = variance[i].replace('[', '');
	    		  variance[i] = variance[i].replace(']', '');
	    	  }
	    	  
	    	  for(var i=0; i<sd.length;i++){
	    		  sd[i] = sd[i].replace('[', '');
	    		  sd[i] = sd[i].replace(']', '');
	    	  }
	    	  
		    	darwin.lawVisualiser.drawLawFour(variance, sd);

		},
		handleLawFiveData : function(response){
			 obj = JSON.parse(response);
			 var allCorr = obj.crossPercent.split(',');

	    	  for(var i=0; i<allCorr.length;i++){
	    		  allCorr[i] = allCorr[i].replace('[', '');
	    		  allCorr[i] = allCorr[i].replace(']', '');
	    	  }
				
	    	  darwin.lawVisualiser.drawLawFive(allCorr);
		},
		handleLawSixData : function(response){
			 obj = JSON.parse(response);
			 var allCorr = obj.crossPercent.split(',');

	    	  for(var i=0; i<allCorr.length;i++){
	    		  allCorr[i] = allCorr[i].replace('[', '');
	    		  allCorr[i] = allCorr[i].replace(']', '');
	    	  }
				
	    	  darwin.lawVisualiser.drawLawSix(allCorr);
		},
		handleLawSevenData : function(response){
			 obj = JSON.parse(response);
			 var allCorr = obj.crossPercent.split(',');

	    	  for(var i=0; i<allCorr.length;i++){
	    		  allCorr[i] = allCorr[i].replace('[', '');
	    		  allCorr[i] = allCorr[i].replace(']', '');
	    	  }
				
	    	  darwin.lawVisualiser.drawLawSeven(allCorr);			
		},
    };
})();