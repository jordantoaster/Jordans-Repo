/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#commitOption1", function () {
		darwin.jsonManagerModule.resetCommitJson();
		darwin.projectManagerModule.resetBaseRequestUrl();
		
		darwin.projectManagerModule.setBaseRequestUrl(0, "https://api.github.com/repos"+$("#commitOption1").text()+"/commits?per_page=100&page=");
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");
	
		//increment number of projects chosen
		darwin.Mediator.setNumCommitProjectSelected();
	
	});
	$(document).on("click.darwin","#commitOption2", function () {
		darwin.jsonManagerModule.resetCommitJson();
		darwin.projectManagerModule.resetBaseRequestUrl();
		
		darwin.projectManagerModule.setBaseRequestUrl(0, "https://api.github.com/repos"+$("#commitOption2").text()+"/commits?per_page=100&page=");
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");		
	
		//increment number of projects chosen
		darwin.Mediator.setNumCommitProjectSelected();
	});
	$(document).on("click.darwin","#commitOption3", function () {		
		darwin.jsonManagerModule.resetCommitJson();
		darwin.projectManagerModule.resetBaseRequestUrl();
		
		darwin.projectManagerModule.setBaseRequestUrl(0, "https://api.github.com/repos"+$("#commitOption3").text()+"/commits?per_page=100&page=");
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");		
		
	    //increment number of projects chosen
		darwin.Mediator.setNumCommitProjectSelected();
	});
	$(document).on("click.darwin","#commitOption4", function () {
		darwin.jsonManagerModule.resetCommitJson();
		darwin.projectManagerModule.resetBaseRequestUrl();
		
		darwin.projectManagerModule.setBaseRequestUrl(0, "https://api.github.com/repos"+$("#commitOption4").text()+"/commits?per_page=100&page=");
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");		
		
	    //increment number of projects chosen
		darwin.Mediator.setNumCommitProjectSelected();
	});
	$(document).on("click.darwin","#commitOption5", function () {		
		darwin.jsonManagerModule.resetCommitJson();
		darwin.projectManagerModule.resetBaseRequestUrl();
		
		darwin.projectManagerModule.setBaseRequestUrl(0, "https://api.github.com/repos"+$("#commitOption5").text()+"/commits?per_page=100&page=");
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");		
	
		//increment number of projects chosen
		darwin.Mediator.setNumCommitProjectSelected();
	});
	
});