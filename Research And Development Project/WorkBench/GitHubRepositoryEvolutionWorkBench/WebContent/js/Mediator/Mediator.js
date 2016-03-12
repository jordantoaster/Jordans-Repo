/**
 * 
 */

var darwin = darwin || {};

darwin.Mediator = (function () {
	
    return {
    	initialSetupBulk : function(){
    	    darwin.projectManagerModule.resetVariables();
    	    darwin.projectManagerModule.resetComponents();
    	    
    	    //get urls
	    	bulkUrls = $('#bulkUrl').val();
	    	bulkUrls = bulkUrls.replace(/\s+/g, '');
	    	
	    	//split on comma to an array
	    	var bulkProjects = [];
	    	bulkProjects = bulkUrls.split(',');
	    	
	    	
	    	for(var i=0; i<bulkProjects.length;i++){
	    		
    	    	parsedUrl = darwin.Mediator.parseInputUrl(bulkProjects[i]);

	    		darwin.projectManagerModule.setProjectNames(parsedUrl);

	    		darwin.projectManagerModule.setBaseRequestUrl(darwin.projectManagerModule.getNumProjects(), "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=")

	    		darwin.projectManagerModule.setNumProjects();
	    		
	    		
	    	}
	    	
    	    darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseContributionData, "contribution","");

        	//darwin.projectManagerModule.enableTabs();

    	},
    	initialSetup : function(){
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
    	        
    	    //if(darwin.projectManagerModule.getIsAuto() == false){
    	    //activate tabs at the end of the process
        	darwin.projectManagerModule.enableTabs();
    	    // }
    	},
    	contribSliderVals : function(start, end){
    		darwin.dataManager.setContribSlider(start, end);
    	}, 
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
			}
		},
		updateProgressBar: function () {
			darwin.progressbarModule.updateProgressBar();
		},
		drawGenericStat : function(data, projectNames, metricType){
			
			if(metricType == "mean"){
			    obj = JSON.parse(data);
			    var parsedData = [];
			    
				//sort the response
				var sortedData = obj.means.split('*');
				var collatedMean = obj.collatedMean;
				var standardDev = obj.standardDev;
				
				for(var i = 0; i<sortedData.length; i++){
					if(sortedData[i] != ""){
						parsedData[i] = parseInt(sortedData[i]);
					}
				}
				
				darwin.statVisualiser.drawMean(parsedData, projectNames, metricType, collatedMean, standardDev);
			}
			if(metricType == "growth"){
			    obj = JSON.parse(data);
			    //var parsedData = [];
			    
			    //use split if accepting many sets of growths 
			    
			    var growthRate = obj.growthRate;
			    var absolute = obj.absoluteGrowthRate;
			    var overTime = obj.growthRateOverTime;
			    
				darwin.statVisualiser.drawGrowth(growthRate, projectNames, metricType, absolute, overTime);
				
				//only runs when auto getting data 
	    	    if(darwin.projectManagerModule.getIsAuto() == true){
					darwin.projectManagerModule.handleAuto(metricType, darwin.projectManagerModule.getNumProjects()-1);
				}
			}
			if(metricType == "normality"){
			    obj = JSON.parse(data);
			    var wilks = obj.wilks;

				darwin.statVisualiser.writeNormality(wilks, projectNames, metricType);
			}

		},
		makeGithubRequest: function (url, callback, action, projectIndex) {
				
			//if not a stat api dataset then perform one manual call
			if(action == "commit"){
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
		parseInputUrl : function(url){
			return darwin.ParseUrlInputModule.parse(url);
		},

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
		setContributionDetails: function(index, additions, deletions, difference, LOCOverTime, sampleIndex, contributionDates, additionsAcc, deletionsAcc){
			darwin.dataManager.setAdditions(index, additions, sampleIndex);
			darwin.dataManager.setDeletions(index, deletions, sampleIndex);
			darwin.dataManager.setDifference(index, difference, sampleIndex);
			darwin.dataManager.setLOCOverTime(index, LOCOverTime, sampleIndex);	
			darwin.dataManager.setContributionDates(index, contributionDates, sampleIndex);
			darwin.dataManager.setAdditionsAcc(index, additionsAcc, sampleIndex);
			darwin.dataManager.setDeletionsAcc(index, deletionsAcc, sampleIndex)
		},
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
			darwin.AjaxResponseModule.handleSuccess(action, response, callback, index);
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
		prepareCommitClick : function(url, projectName){
			darwin.jsonManagerModule.resetCommitJson(url);
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.Mediator.disableCommitButton();
			
			index = darwin.Mediator.getProjNameIndex(projectName);
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "commit", index);		
		},
		prepareStarClick : function(url, projectName){
			darwin.jsonManagerModule.resetStarJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableStarButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			index = darwin.Mediator.getProjNameIndex(projectName);

			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "star", index);		
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
			darwin.customVisualiser.draw(values, xAxis, chartTitle, sampleIndex, chartType);	
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
    };
})();