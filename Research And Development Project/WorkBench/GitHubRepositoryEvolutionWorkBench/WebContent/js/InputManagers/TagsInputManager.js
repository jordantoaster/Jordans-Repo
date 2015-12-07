/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#TagsOption1", function () {
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption1").text()+"/tags?per_page=100&page=");	
		TagsReset();

	});
	$(document).on("click.darwin","#TagsOption2", function () {
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption2").text()+"/tags?per_page=100&page=");	
		TagsReset();

	});
	$(document).on("click.darwin","#TagsOption3", function () {		
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption3").text()+"/tags?per_page=100&page=");	
		TagsReset();

	});
	$(document).on("click.darwin","#TagsOption4", function () {
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption4").text()+"/tags?per_page=100&page=");	
		TagsReset();

	});
	$(document).on("click.darwin","#TagsOption5", function () {			
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption5").text()+"/tags?per_page=100&page=");	
		TagsReset();

	});	
	$('#sampleRate1Tags').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		drawTagsGraph();

	});	
	$('#sampleRate2Tags').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		drawTagsGraph();

	});	
	$('#sampleRate3Tags').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		drawTagsGraph();

	});	
	$('#sampleRate4Tags').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
		drawTagsGraph();

	});	
	
	$('#chartType1Tags').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		drawTagsGraph();
	});
	$('#chartType2Tags').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		drawTagsGraph();
	});
	$('#chartType3Tags').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		drawTagsGraph();

	});
	
	function drawTagsGraph(){
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getForkDetails(), "weeks", "week On week Watchers", darwin.projectManagerModule.getSampleIndex(), "fork", darwin.Mediator.getChartType());
	}

	function TagsReset(){
		darwin.progressbarModule.reset();
	}
});