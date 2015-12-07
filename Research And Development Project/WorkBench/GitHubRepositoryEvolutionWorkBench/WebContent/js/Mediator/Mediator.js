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
		makeGithubRequest: function (url, callback, action) {
				
			//if not a stat api dataset then perform one manual call
			if(action == "commit" || action == "star"){
				darwin.githubModule.send(url[0] + darwin.projectManagerModule.getcurrRequestPage(), callback, 0, action);
			} else {
				//if a stat api then loop each url, only send true callback on final url
				for(i=0;i<url.length;i++){
									
					//only perform actually call back when all request data collected
					if(i==(url.length-1)){
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), callback, i, action);
					} else {
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), callback, i, action);					
					}	
				}
			}
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		githubParseGenericData: function (response, index, action) {
			darwin.genericExtractorModule.extract(response, index, action);
		},
		githubParseStarData: function (response, index) {
			darwin.starExtractorModule.extract(response, index);
		},
		drawContributionGraph: function (values, xAxis, chartTitle, LOC, totalLines, sampleIndex, chartType) {	
			
			darwin.ContributionVisualiser.draw(values, xAxis, chartTitle, sampleIndex, chartType);	
			
			if(values.length == 1){
				darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		drawGenericGraph: function (values, xAxis, chartTitle, sampleIndex, action, chartType) {			
			darwin.genericVisualiser.draw(values, xAxis, chartTitle, sampleIndex, action, chartType);	
		},
		drawStarGraph: function (values, xAxis, chartTitle, sampleIndex) {			
			console.log("a");
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
		setContributionDetails: function(index, additions, deletions, difference, LOCOverTime, sampleIndex, contributionDates){
			darwin.dataManager.setAdditions(index, additions, sampleIndex);
			darwin.dataManager.setDeletions(index, deletions, sampleIndex);
			darwin.dataManager.setDifference(index, difference, sampleIndex);
			darwin.dataManager.setLOCOverTime(index, LOCOverTime, sampleIndex);	
			darwin.dataManager.setContributionDates(index, contributionDates, sampleIndex);
		},
		setCommitDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setCommits(index, commits, projectNames, sampleIndex);
		},
		setStarDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setStars(index, commits, projectNames, sampleIndex);
		},
		getCommitDetails : function(){
			return darwin.dataManager.getCommits();
		},
		getStarDetails : function(){
			return darwin.dataManager.getStars();
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
		getNumWatcherProjectSelected : function(){
			return darwin.projectManagerModule.getWatcherProjectsAdded();
		},
		setNumWatcherProjectSelected : function(){
			darwin.projectManagerModule.setWatcherProjectsAdded();
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
		getWatcherJson : function(){
			return darwin.jsonManagerModule.getWatcherJson()
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
		prepareCommitClick : function(url){
			darwin.jsonManagerModule.resetCommitJson(url);
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.Mediator.disableCommitButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "commit");		
		},
		prepareStarClick : function(url){
			darwin.jsonManagerModule.resetStarJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableStarButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "star");		
		},
		prepareWatcherClick : function(url){
			darwin.jsonManagerModule.resetWatcherJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableWatcherButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), darwin.Mediator.githubParseGenericData, "watcher");		
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
		getStarsIndex : function(index){
			return darwin.dataManager.getStarsIndex(index);
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
		getChartType : function(){
			return darwin.projectManagerModule.getChartType();
		},
		setChartType : function(val){
			darwin.projectManagerModule.setChartType(val);
		}
    };
})();