/**
 * 
 */

var darwin = darwin || {};

//default values + variables that change based on user input
darwin.currentAction = "difference";
darwin.samplingRate = 13;

$(document).ready(function(e) {
	
	//darwin.disableTabs();
	darwin.loadGraphLibrary();
	
	/*USER INPUT CODE BLOCKS - Query Page*/
	/*Handles url input*/
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		parsedUrl = darwin.parseGithubURL($("#urlField").val());
	    darwin.resetVariables();
				
        baseRequestUrl = "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page="+darwin.responsePage;
        darwin.performAjaxRequestGitHub(baseRequestUrl, "GET", darwin.collectCodefrequencyData)
	});
	
	/*NEXT THREE BLOCKS*/
	/*CHANGES THE CURRENT USER INPUT ACTION, REQUESTS GRAPH REDRAW*/
	$('#changeValues1').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentAction = "difference"
		darwin.drawContributionGraph(darwin.contributionDates, darwin.difference, 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');

	});	
	$('#changeValues2').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentAction = "addition"
		darwin.drawContributionGraph(darwin.contributionDates, darwin.additions, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');
	});	
	$('#changeValues3').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentAction = "deletion"
		darwin.drawContributionGraph(darwin.contributionDates, darwin.deletions, 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');
	});
	

	/*NEXT THREE BLOCKS*/
	/*RESET THE VARIABLES USED IN JSON PARSING, ADJUST SAMPLING RATE, REQUEST RESAMPLE*/
	$('#sampleRate1').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.resetVariables();

		darwin.samplingRate = 6;
		darwin.collectCodefrequencyData(darwin.currentJson);
	});	
	$('#sampleRate2').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.resetVariables();

		darwin.samplingRate = 13;
		darwin.collectCodefrequencyData(darwin.currentJson);

	});	
	$('#sampleRate3').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.resetVariables();

		darwin.samplingRate = 26;
		darwin.collectCodefrequencyData(darwin.currentJson);
	});

});