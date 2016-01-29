/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#IssuesOption1", function () {
		darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+$("#ForkOption1").text()+"/issues/", $("#IssuesOption1").text());	
		IssuesReset();

	});
	$(document).on("click.darwin","#IssuesOption2", function () {
		darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+$("#ForkOption2").text()+"/issues/", $("#IssuesOption2").text());	
		IssuesReset();

	});
	$(document).on("click.darwin","#IssuesOption3", function () {		
		darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+$("#ForkOption3").text()+"/issues/", $("#IssuesOption3").text());	
		IssuesReset();

	});
	$(document).on("click.darwin","#IssuesOption4", function () {
		darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+$("#ForkOption4").text()+"/issues/", $("#IssuesOption4").text());	
		IssuesReset();

	});
	$(document).on("click.darwin","#IssuesOption5", function () {			
		darwin.Mediator.prepareIssuesClick("https://api.github.com/repos"+$("#ForkOption5").text()+"/issues/", $("#IssuesOption5").text());	
		IssuesReset();

	});	
	$('#sampleRate1Issues').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		drawIssuesGraph();

	});	
	$('#sampleRate2Issues').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		drawIssuesGraph();

	});	
	$('#sampleRate3Issues').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		drawIssuesGraph();

	});	
	$('#sampleRate4Issues').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
		drawIssuesGraph();

	});	
	
	$('#chartType1Issues').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		drawIssuesGraph();
	});
	$('#chartType2Issues').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		drawIssuesGraph();
	});
	$('#chartType3Issues').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		drawIssuesGraph();

	});
	
	$('#issueType1').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setIssuesType("open");
		drawIssuesGraph();
	});
	$('#issueType2').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setIssuesType("closed");
		drawIssuesGraph();
	});
	$('#issueType3').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setIssuesType("all");
		drawIssuesGraph();

	});
	
	function drawIssuesGraph(){
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getIssuesDetails(), "weeks", "week On week Issues", darwin.projectManagerModule.getSampleIndex(), "Issues", darwin.Mediator.getChartType());
	}

	function IssuesReset(){
		darwin.progressbarModule.reset();
	}
});