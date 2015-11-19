/**
 * 
 */

var darwin = darwin || {};

//Used by a large number of files, global use makes sense
darwin.currentContrubutionAction = "difference";

$(document).ready(function(e) {
	
	/*NEXT THREE BLOCKS*/
	/*CHANGES THE CURRENT USER INPUT ACTION, REQUESTS GRAPH REDRAW*/
	$('#changeValues1Contributions').on("click.darwin", function(e){
		e.preventDefault();	
				
		darwin.currentContrubutionAction = "difference"
			
		darwin.Mediator.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.dataManager.getAllDifference(), 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');
	});	
	$('#changeValues2Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "addition"
				
		darwin.Mediator.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.dataManager.getAllAdditions(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');

	});	
	$('#changeValues3Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "deletion"
			
		darwin.Mediator.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.dataManager.getAllDeletions(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');	

	});
	$('#changeValues4Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "LOC"
			
		darwin.Mediator.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.dataManager.getAllLOCOverTime(), "", 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'LOC Over Time');

	});
	

	/*NEXT THREE BLOCKS*/
	/*RESET THE VARIABLES USED IN JSON PARSING, ADJUST SAMPLING RATE, REQUEST RESAMPLE*/
	$('#sampleRate1Contributions').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Mediator.resetContributionVariables();

		darwin.projectManagerModule.setSamplingRate(1);	
		darwin.Mediator.resampleContributions(darwin.jsonManagerModule.getAllContributionJson());
	});	
	$('#sampleRate2Contributions').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Mediator.resetContributionVariables();

	    darwin.projectManagerModule.setSamplingRate(6);	
		darwin.Mediator.resampleContributions(darwin.jsonManagerModule.getAllContributionJson());

	});	
	$('#sampleRate3Contributions').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Mediator.resetContributionVariables();

	    darwin.projectManagerModule.setSamplingRate(13);	
		darwin.Mediator.resampleContributions(darwin.jsonManagerModule.getAllContributionJson());
	});
	$('#sampleRate4Contributions').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Mediator.resetContributionVariables();

	    darwin.projectManagerModule.setSamplingRate(26);	
		darwin.Mediator.resampleContributions(darwin.jsonManagerModule.getAllContributionJson());
	});
});