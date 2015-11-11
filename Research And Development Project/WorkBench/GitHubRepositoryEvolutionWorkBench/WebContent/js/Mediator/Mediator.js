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
				
				//only perform actually call back when all request data collected
				if(i==(url.length-1)){
		        	darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, callback, i, action);
				} else {
		        	darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, darwin.projectManagerModule.noCallBack, i, action);
				}				
			}
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		githubParseCommitData: function (response) {
			darwin.commitExtractorModule.extract(response);
		},
		drawContributionGraph: function (dates, values, xAxis, chartTitle, LOC, totalLines) {			
			darwin.ContributionVisualiser.draw(dates, values, xAxis, chartTitle, "");	
			
			if(values.length == 1){
				darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		drawCommitGraph: function (dates, values, xAxis, chartTitle) {			
			darwin.commitVisualiser.draw(dates, values, xAxis, chartTitle);	
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		resetContributionVariables: function(){
			darwin.contributionExtractorModule.resetVariables();
		},
		resampleContributions : function(currentJson){
			darwin.contributionExtractorModule.extract(currentJson);
		},
		parseInputUrl : function(url){
			return darwin.ParseUrlInputModule.parse(url);
		},
		packager : function(seriesA, SeriesB, seriesC, seriesD ,dataType){
			if(dataType == "contributions"){
				darwin.packager.contributions(seriesA, SeriesB, seriesC,seriesD);
			}
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
		}
    };
})();