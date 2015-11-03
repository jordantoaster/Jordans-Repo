/**
 * 
 */

var darwin = darwin || {};

//Used by a large number of files, global use makes sense
darwin.currentContrubutionAction = "difference";
darwin.currentJson = "";
darwin.currentJsonTwo = "";
darwin.newQuery = true;

$(document).ready(function(e) {
	
	/*NEXT THREE BLOCKS*/
	/*CHANGES THE CURRENT USER INPUT ACTION, REQUESTS GRAPH REDRAW*/
	$('#changeValues1').on("click.darwin", function(e){
		e.preventDefault();	
				
		darwin.currentContrubutionAction = "difference"
			
		if(!darwin.projectManagerModule.getComparison()){	
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDifference(),"", 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');
		}
		else {
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDifference(), darwin.contributionExtractorModule.getDifferenceTwo(), 'Sample Size: ' + darwin.samplingRate + ' Weeks','Difference Of Additions And Deletions');
		}
	});	
	$('#changeValues2').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "addition"
			
		if(!darwin.projectManagerModule.getComparison()){	
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getAddition(), "", 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');
		} else {
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getAddition(), darwin.contributionExtractorModule.getAdditionTwo(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Additions');
		}
	});	
	$('#changeValues3').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "deletion"
			
		if(!darwin.projectManagerModule.getComparison()){	
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDeletion(), "", 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');
		} else {
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getDeletion(), darwin.contributionExtractorModule.getDeletionTwo(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'Amount of Deletions');			
		}
	});
	$('#changeValues4').on("click.darwin", function(e){
		e.preventDefault();

		darwin.currentContrubutionAction = "LOC"
			
		if(!darwin.projectManagerModule.getComparison()){	
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getLOC(), "", 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'LOC Over Time');
		} else {
			darwin.Facade.drawContributionGraph(darwin.contributionExtractorModule.getDates(), darwin.contributionExtractorModule.getLOC(), darwin.contributionExtractorModule.getLOCTwo(), 'Sample Size: ' + darwin.samplingRate + ' Weeks', 'LOC Over Time');				
		}
	});
	

	/*NEXT THREE BLOCKS*/
	/*RESET THE VARIABLES USED IN JSON PARSING, ADJUST SAMPLING RATE, REQUEST RESAMPLE*/
	$('#sampleRate1').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

		darwin.projectManagerModule.setSamplingRate(1);	
		darwin.Facade.resampleContributions(darwin.currentJson, darwin.currentJsonTwo);
	});	
	$('#sampleRate2').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

	    darwin.projectManagerModule.setSamplingRate(6);	
		darwin.Facade.resampleContributions(darwin.currentJson, darwin.currentJsonTwo);

	});	
	$('#sampleRate3').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

	    darwin.projectManagerModule.setSamplingRate(13);	
		darwin.Facade.resampleContributions(darwin.currentJson, darwin.currentJsonTwo);
	});
	$('#sampleRate4').on("click.darwin", function(e){
		e.preventDefault();
	    darwin.Facade.resetContributionVariables();

	    darwin.projectManagerModule.setSamplingRate(26);	
		darwin.Facade.resampleContributions(darwin.currentJson, darwin.currentJsonTwo);
	});
});