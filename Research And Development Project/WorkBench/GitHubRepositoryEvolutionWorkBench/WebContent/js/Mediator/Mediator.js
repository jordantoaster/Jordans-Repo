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
		makeGithubRequest: function (url, type, callback,urlTwo) {
        	darwin.githubModule.send(url, type, callback);
            
        	if(darwin.projectManagerModule.getComparison()){
        		darwin.githubModule.send(urlTwo, type, callback);
        	}
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		drawContributionGraph: function (dates, values, valuesTwo, xAxis, chartTitle, LOC, totalLines) {
			
			if(!darwin.projectManagerModule.getComparison()){
				darwin.ContributionVisualiser.draw(dates, values, xAxis, chartTitle, "");
			} else {
				darwin.ContributionVisualiser.draw(dates, values, xAxis, chartTitle, valuesTwo);
			}
			
			//dont show minor stats when comparing - fix this later
			if(typeof LOC != 'undefined'){
				darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		resetContributionVariables: function(){
			darwin.contributionExtractorModule.resetVariables();
		},
		resampleContributions : function(currentJson, currentJsonTwo){
			darwin.contributionExtractorModule.extract(currentJson);
			
			if(darwin.projectManagerModule.getComparison()){
				darwin.contributionExtractorModule.extract(currentJsonTwo);
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
		emptyCallback : function(){
			
		}

    };
})();