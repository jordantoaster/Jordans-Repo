/**
 * 
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	/*NEXT THREE BLOCKS*/
	/*CHANGES THE CURRENT USER INPUT ACTION, REQUESTS GRAPH REDRAW*/
	$('#changeValues1Contributions').on("click.darwin", function(e){
		e.preventDefault();	
				
		darwin.projectManagerModule.setCurrentContributionMetric("difference");		
			
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllDifference(), "","","","", darwin.projectManagerModule.getSampleIndex());
	});	
	$('#changeValues2Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCurrentContributionMetric("addition");		
				
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllAdditions(), "","","","", darwin.projectManagerModule.getSampleIndex());

	});	
	$('#changeValues3Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCurrentContributionMetric("deletion");		
			
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllDeletions(), "","","","",darwin.projectManagerModule.getSampleIndex());	

	});
	$('#changeValues4Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCurrentContributionMetric("LOC");		
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllLOCOverTime(), "","","","",darwin.projectManagerModule.getSampleIndex());

	});
	

	/*NEXT THREE BLOCKS*/
	/*RESET THE VARIABLES USED IN JSON PARSING, ADJUST SAMPLING RATE, REQUEST RESAMPLE*/
	$('#sampleRate1Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setSampleIndex(0);	
	    changeSampleRate();
	});	
	$('#sampleRate2Contributions').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    changeSampleRate();

	});	
	$('#sampleRate3Contributions').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    changeSampleRate();
	});
	$('#sampleRate4Contributions').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    changeSampleRate();
	});
	
	function changeSampleRate(){
		darwin.Mediator.drawContributionGraph(darwin.projectManagerModule.getContributionMetricArray(darwin.projectManagerModule.getCurrentContributionMetric()), "", "", 0, 0, darwin.projectManagerModule.getSampleIndex());
	}

});