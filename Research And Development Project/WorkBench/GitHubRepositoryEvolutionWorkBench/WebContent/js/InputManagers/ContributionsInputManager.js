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
			
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllDifference(), "","","","", darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType(), darwin.projectManagerModule.getProjectNames());
	});	
	$('#changeValues2Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCurrentContributionMetric("addition");		
				
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllAdditions(), "","","","", darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType(), darwin.projectManagerModule.getProjectNames());

	});	
	$('#changeValues3Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCurrentContributionMetric("deletion");		
			
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllDeletions(), "","","","",darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType(), darwin.projectManagerModule.getProjectNames());	

	});
	$('#changeValues4Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCurrentContributionMetric("LOC");		
		darwin.Mediator.drawContributionGraph(darwin.dataManager.getAllLOCOverTime(), "","","","",darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType(), darwin.projectManagerModule.getProjectNames());

	});
	

	/*NEXT THREE BLOCKS*/
	/*RESET THE VARIABLES USED IN JSON PARSING, ADJUST SAMPLING RATE, REQUEST RESAMPLE*/
	$('#sampleRate1Contributions').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setSampleIndex(0);	
		redrawGraph();
	});	
	$('#sampleRate2Contributions').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    redrawGraph();

	});	
	$('#sampleRate3Contributions').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    redrawGraph();
	});
	$('#sampleRate4Contributions').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    redrawGraph();
	});
	$('#chartType1Contribution').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		redrawGraph();
	});
	$('#chartType2Contribution').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		redrawGraph();
	});
	$('#chartType3Contribution').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		redrawGraph();

	});
	
	function redrawGraph(){
		darwin.Mediator.drawContributionGraph(darwin.projectManagerModule.getContributionMetricArray(darwin.projectManagerModule.getCurrentContributionMetric()), "", "", 0, 0, darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType(), darwin.projectManagerModule.getProjectNames());
	}

});