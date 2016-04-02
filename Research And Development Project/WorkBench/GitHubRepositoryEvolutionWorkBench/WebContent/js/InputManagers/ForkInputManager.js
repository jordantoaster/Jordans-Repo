/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */
var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#ForkOption1", function () {
		darwin.Mediator.prepareForkClick("https://api.github.com/repos"+$("#ForkOption1").text()+"/forks?per_page=100&page=", $("#ForkOption1").text());	
		ForkReset();

	});
	$(document).on("click.darwin","#ForkOption2", function () {
		darwin.Mediator.prepareForkClick("https://api.github.com/repos"+$("#ForkOption2").text()+"/forks?per_page=100&page=", $("#ForkOption2").text());	
		ForkReset();

	});
	$(document).on("click.darwin","#ForkOption3", function () {		
		darwin.Mediator.prepareForkClick("https://api.github.com/repos"+$("#ForkOption3").text()+"/forks?per_page=100&page=", $("#ForkOption3").text());	
		ForkReset();

	});
	$(document).on("click.darwin","#ForkOption4", function () {
		darwin.Mediator.prepareForkClick("https://api.github.com/repos"+$("#ForkOption4").text()+"/forks?per_page=100&page=", $("#ForkOption4").text());	
		ForkReset();

	});
	$(document).on("click.darwin","#ForkOption5", function () {			
		darwin.Mediator.prepareForkClick("https://api.github.com/repos"+$("#ForkOption5").text()+"/forks?per_page=100&page=", $("#ForkOption5").text());	
		ForkReset();

	});	
	$('#sampleRate1Fork').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		drawForkGraph();

	});	
	$('#sampleRate2Fork').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		drawForkGraph();

	});	
	$('#sampleRate3Fork').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		drawForkGraph();

	});	
	$('#sampleRate4Fork').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
		drawForkGraph();

	});	
	
	$('#chartType1Fork').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		drawForkGraph();
	});
	$('#chartType2Fork').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		drawForkGraph();
	});
	$('#chartType3Fork').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		drawForkGraph();

	});
	
	function drawForkGraph(){
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getForkDetails(), "weeks", "week On week Watchers", darwin.projectManagerModule.getSampleIndex(), "fork", darwin.Mediator.getChartType());
	}

	function ForkReset(){
		darwin.progressbarModule.reset();
	}
});