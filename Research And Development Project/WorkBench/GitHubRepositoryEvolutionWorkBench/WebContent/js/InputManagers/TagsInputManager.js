/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */
var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#TagsOption1", function () {
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption1").text()+"/tags?per_page=100&page=", $("#TagsOption1").text());
		darwin.projectManagerModule.setSelectedTagProject(darwin.Mediator.getNumTagsProjectSelected(), $("#TagsOption1").text());
		TagsReset();

	});
	$(document).on("click.darwin","#TagsOption2", function () {
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption2").text()+"/tags?per_page=100&page=", $("#TagsOption2").text());	
		darwin.projectManagerModule.setSelectedTagProject(darwin.Mediator.getNumTagsProjectSelected(), $("#TagsOption2").text());
		TagsReset();
	});
	$(document).on("click.darwin","#TagsOption3", function () {		
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption3").text()+"/tags?per_page=100&page=", $("#TagsOption3").text());	
		darwin.projectManagerModule.setSelectedTagProject(darwin.Mediator.getNumTagsProjectSelected(), $("#TagsOption3").text());
		TagsReset();
	});
	$(document).on("click.darwin","#TagsOption4", function () {
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption4").text()+"/tags?per_page=100&page=", $("#TagsOption4").text());	
		darwin.projectManagerModule.setSelectedTagProject(darwin.Mediator.getNumTagsProjectSelected(), $("#TagsOption4").text());
		TagsReset();
	});
	$(document).on("click.darwin","#TagsOption5", function () {			
		darwin.Mediator.prepareTagsClick("https://api.github.com/repos"+$("#TagsOption5").text()+"/tags?per_page=100&page=", $("#TagsOption5").text());	
		darwin.projectManagerModule.setSelectedTagProject(darwin.Mediator.getNumTagsProjectSelected(), $("#TagsOption5").text());
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
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getTagsDetails(), "weeks", "week On week tags", darwin.projectManagerModule.getSampleIndex(), "tags", darwin.Mediator.getChartType());
	}

	function TagsReset(){
		darwin.progressbarModule.reset();
	}
});