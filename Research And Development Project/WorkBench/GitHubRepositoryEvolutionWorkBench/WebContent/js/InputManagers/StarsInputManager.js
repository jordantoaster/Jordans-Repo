/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#starOption1", function () {
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption1").text()+"/stargazers?per_page=100&page=", $("#starOption1").text());	
		starReset();

	});
	$(document).on("click.darwin","#starOption2", function () {
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption2").text()+"/stargazers?per_page=100&page=", $("#starOption2").text());	
		starReset();

	});
	$(document).on("click.darwin","#starOption3", function () {		
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption3").text()+"/stargazers?per_page=100&page=", $("#starOption3").text());	
		starReset();

	});
	$(document).on("click.darwin","#starOption4", function () {
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption4").text()+"/stargazers?per_page=100&page=", $("#starOption4").text());	
		starReset();

	});
	$(document).on("click.darwin","#starOption5", function () {			
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption5").text()+"/stargazersper_page=100&page=", $("#starOption5").text());	
		starReset();

	});	
	$('#sampleRate1Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		drawStarGraph();

	});	
	$('#sampleRate2Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		drawStarGraph();

	});	
	$('#sampleRate3Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		drawStarGraph();

	});	
	$('#sampleRate4Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
		drawStarGraph();

	});	
	
	$('#chartType1Stars').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		drawStarGraph();
	});
	$('#chartType2Stars').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		drawStarGraph();
	});
	$('#chartType3Stars').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		drawStarGraph();

	});
	
	function drawStarGraph(){
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "star", darwin.Mediator.getChartType());
	}

	function starReset(){
		darwin.progressbarModule.reset();
	}
});