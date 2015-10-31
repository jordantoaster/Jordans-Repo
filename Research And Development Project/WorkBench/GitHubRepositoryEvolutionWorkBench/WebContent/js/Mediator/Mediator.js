/**
 * 
 */

var darwin = darwin || {};

darwin.Mediator = (function () {
    return {
    	authenticate: function (action, callback, type, input) {
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
		drawContributionGraph: function (dates, values, xAxis, chartTitle) {
			darwin.ContributionVisualiser.draw(dates, values, xAxis, chartTitle);
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		resetContributionVariables: function(){
			darwin.contributionExtractorModule.resetVariables();
		},
		resampleContributions : function(currData){
			darwin.contributionExtractorModule.extract(currData);
		}
    };
})();