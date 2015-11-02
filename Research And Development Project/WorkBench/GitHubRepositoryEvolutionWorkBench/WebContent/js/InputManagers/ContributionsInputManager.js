/**
 * 
 */

var darwin = darwin || {};

//Used by a large number of files, global use makes sense
darwin.currentContrubutionAction = "difference";

$(document).ready(function(e) {
	
	/*NEXT THREE BLOCKS*/
	/*CHANGES THE CURRENT USER INPUT ACTION, REQUESTS GRAPH REDRAW*/
	$('#changeValues1').on("click.darwin", function(e){
		e.preventDefault();	
				
		darwin.currentContrubutionAction = "difference"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDifference(), 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');

	});	
	$('#changeValues2').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "addition"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getAddition(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');
	});	
	$('#changeValues3').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "deletion"
		darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDeletion(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');
	});
	$('#changeValues4').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "LOC"
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