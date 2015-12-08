/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#commitOption1", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption1").text()+"/commits?per_page=100&page=", $("#commitOption1").text());	
		resetCommit();
	});
	$(document).on("click.darwin","#commitOption2", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption2").text()+"/commits?per_page=100&page=", $("#commitOption2").text());	
		resetCommit();
	});
	$(document).on("click.darwin","#commitOption3", function () {		
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption3").text()+"/commits?per_page=100&page=", $("#commitOption3").text());	
		resetCommit();

	});
	$(document).on("click.darwin","#commitOption4", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption4").text()+"/commits?per_page=100&page=", $("#commitOption4").text());	
		resetCommit();
	});
	$(document).on("click.darwin","#commitOption5", function () {			
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption5").text()+"/commits?per_page=100&page=", $("#commitOption5").text());	
		resetCommit();
	});	
	$('#sampleRate1Commits').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

	    drawCommitGraph();

	});	
	$('#sampleRate2Commits').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
	    drawCommitGraph();

	});	
	$('#sampleRate3Commits').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
	    drawCommitGraph();

	});	
	$('#sampleRate4Commits').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
	    drawCommitGraph();
	});	
	$('#chartType1Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		drawCommitGraph();
	});
	$('#chartType2Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		drawCommitGraph();
	});
	$('#chartType3Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		drawCommitGraph();

	});
	
	function drawCommitGraph(){
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "commit", darwin.Mediator.getChartType());
	}
	
	function resetCommit(){
		darwin.progressbarModule.reset();
	}
});