/**
 * 
 */

var darwin = darwin || {};

darwin.Mediator = (function () {
    return {
    	makeServerRequest: function (action, callback, type, input) {
    		darwin.serverModule.send(action, callback, type, input);
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
		makeGithubRequest: function (url, type, callback, action) {
			for(i=0;i<url.length;i++){
								
				//stops race conditions
				timer = setTimeout(darwin.projectManagerModule.noCallBack(), 100);

				//only perform actually call back when all request data collected
				if(i==(url.length-1)){
					if(action == "commit"){
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, callback, darwin.Mediator.getNumCommitProjectSelected(), action);
					} else {
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, callback, i, action);
					}
				} else {
					darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, darwin.projectManagerModule.noCallBack, i, action);					
				}	
			}
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		githubParseCommitData: function (response, index) {
			darwin.commitExtractorModule.extract(response, index);
		},
		drawContributionGraph: function (dates, values, xAxis, chartTitle, LOC, totalLines) {			
			darwin.ContributionVisualiser.draw(dates, values, xAxis, chartTitle, "");	
			
			if(values.length == 1){
				darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		drawCommitGraph: function (dates, values, xAxis, chartTitle, iterateNum) {			
			darwin.commitVisualiser.draw(dates, values, xAxis, chartTitle, iterateNum);	
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		resetContributionVariables: function(){
			darwin.contributionExtractorModule.resetVariables();
		},
		resetCommitVariables: function(){
			darwin.projectManagerModule.resetProjectNames();
			darwin.projectManagerModule.resetNumProjects();
			darwin.dataManager.resetCommitsList();
			darwin.commitManager.resetProjectsAdded();
		},
		resampleContributions : function(currentJson){
			darwin.contributionExtractorModule.extract(currentJson);
		},
		resampleCommits : function(currentJson){
			//pass in commits one at a time
			for(var i =0; i<currentJson.length;i++){
				darwin.commitExtractorModule.extract(currentJson[i],i);
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
		packagerCommits : function(dates, commits,dataType){
			darwin.packager.commits(dates, commits,dataType);
		},
		emptyCallback : function(){
			
		},
		setContributionDetails: function(index, additions, deletions, difference, LOCOverTime){
			darwin.dataManager.setAdditions(index, additions);
			darwin.dataManager.setDeletions(index, deletions);
			darwin.dataManager.setDifference(index, difference);
			darwin.dataManager.setLOCOverTime(index, LOCOverTime);	
		},
		setCommitDetails : function(index, commits){
			darwin.dataManager.setCommits(index, commits);
		},
		getCommitDetails : function(){
			return darwin.dataManager.getCommits();
		},
		setNumCommitProjectSelected : function(){
			darwin.commitManager.setProjectsAdded(darwin.commitManager.getProjectsAdded() + 1);
		},
		getNumCommitProjectSelected : function(){
			return darwin.commitManager.getProjectsAdded();
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
		resetcurrRequestPage : function(index){
			darwin.projectManagerModule.resetcurrRequestPage(index);
		},
		getAllCommitJson : function(){
			return darwin.jsonManagerModule.getAllCommitJson()
		},
		getIndexCommitJson : function(index){
			return darwin.jsonManagerModule.getCommitJson(index)
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
		makeGithubRequestSingleUrl : function(url, type, callback, index, action){
			  darwin.githubModule.send(url, type, callback, index, action);
		},
		prepareCommitClick : function(url){
			darwin.jsonManagerModule.resetCommitJson(url);
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.Mediator.disableCommitButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");		
		},
		disableCommitButton : function(){
			darwin.projectManagerModule.disableCommitButton();
		},
		enableCommitButton : function(){
			darwin.projectManagerModule.enableCommitButton();
		},
		setupCustomComponentsOptions : function(){
			darwin.customTabModule.setupUiOptions();
		},
		setupCustomComponentsDropDown : function(){
			darwin.customTabModule.setupUiDropDown();
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
		addToCustomList : function(array, name){
			darwin.dataManager.addToCustomList(array);
			darwin.dataManager.addToCustomNameList(name);
		},
		drawCustomGraph: function (values, xAxis, chartTitle) {			
			darwin.customVisualiser.draw(values, xAxis, chartTitle);	
		},
		resetCustomProcess : function(){
			darwin.dataManager.clearCustomList();
			darwin.dataManager.clearCustomNameList();
			darwin.customTabModule.removeChecks();
		},
		copyObject : function(obj){
			return darwin.copyObjectModule.copyObject(obj);
		}
    };
})();