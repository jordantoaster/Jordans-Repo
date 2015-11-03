/**
 * modular implementation of a facade in java script
 * acts as an API for the client, if changes are required to underyling architecture, the facade makes this simpler. 
 * loose coupling strategy
 */

var darwin = darwin || {};

darwin.Facade = (function () {
    return {
    	makeServerRequest: function (action, callback, type, input) {
        	darwin.Mediator.makeServerRequest(action, callback, type, input);
        },
        makeGithubRequest: function (url, type, callback) {
        	darwin.Mediator.makeGithubRequest(url, type, callback);
        },
        loadGraphLibrary: function(){
        	darwin.Mediator.loadGraphLibrary();
        },
        drawContributionGraph: function (dates, values, xAxis, chartTitle){
        	darwin.Mediator.drawContributionGraph(dates, values, xAxis, chartTitle);
        }, 
        resetContributionVariables: function(){
        	darwin.Mediator.resetContributionVariables();
        },
        resampleContributions: function(currData){
        	darwin.Mediator.resampleContributions(currData);
        },
        parseInputUrl: function(url){
        	return darwin.Mediator.parseInputUrl(url);
        }
    };
})();