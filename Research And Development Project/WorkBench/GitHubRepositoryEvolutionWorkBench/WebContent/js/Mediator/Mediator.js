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
		makeGithubRequest: function (url, type, callback) {
    		darwin.githubModule.send(url, type, callback);
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		drawContributionGraph: function (dates, values, xAxis, chartTitle, LOC, totalLines) {
			darwin.ContributionVisualiser.draw(dates, values, xAxis, chartTitle);
			
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
		resampleContributions : function(currData){
			darwin.contributionExtractorModule.extract(currData);
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