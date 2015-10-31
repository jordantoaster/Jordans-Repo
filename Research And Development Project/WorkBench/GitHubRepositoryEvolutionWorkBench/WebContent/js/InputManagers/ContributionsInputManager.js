/**
 * 
 */

var darwin = darwin || {};

//default values + variables that change based on user input
darwin.currentAction = "difference";
darwin.samplingRate = 13;

$(document).ready(function(e) {
	
	//darwin.disableTabs();
	darwin.Facade.loadGraphLibrary();
	
	/*USER INPUT CODE BLOCKS - Query Page*/
	/*Handles url input*/
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		parsedUrl = darwin.parseGithubURL($("#urlField").val());
		
		/*contributution variables*/
	    darwin.resetVariables();
				
        baseRequestUrl = "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page="+darwin.responsePage;
        
        //darwin.Mediator.githubParseContributionData
        darwin.Facade.makeGithubRequest(baseRequestUrl, "GET", darwin.Mediator.githubParseContributionData)
	});
	
	/*NEXT THREE BLOCKS*/
	/*CHANGES THE CURRENT USER INPUT ACTION, REQUESTS GRAPH REDRAW*/
	$('#changeValues1').on("click.darwin", function(e){
		e.preventDefault();	
				
		darwin.currentAction = "difference"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDifference(), 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');

	});	
	$('#changeValues2').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentAction = "addition"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getAddition(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');
	});	
	$('#changeValues3').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentAction = "deletion"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDeletion(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');
	});
	$('#changeValues4').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentAction = "LOC"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getLOC(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'LOC Over Time');
	});
	

	/*NEXT THREE BLOCKS*/
	/*RESET THE VARIABLES USED IN JSON PARSING, ADJUST SAMPLING RATE, REQUEST RESAMPLE*/
	$('#sampleRate1').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

		darwin.samplingRate = 1;
		darwin.Facade.resampleContributions(darwin.currentJson);
	});	
	$('#sampleRate2').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

		darwin.samplingRate = 6;
		darwin.Facade.resampleContributions(darwin.currentJson);

	});	
	$('#sampleRate3').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

		darwin.samplingRate = 13;
		darwin.Facade.resampleContributions(darwin.currentJson);
	});
	$('#sampleRate4').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

		darwin.samplingRate = 26;
		darwin.Facade.resampleContributions(darwin.currentJson);
	});
});