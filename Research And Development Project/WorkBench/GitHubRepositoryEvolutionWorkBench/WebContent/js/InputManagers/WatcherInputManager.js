/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#WatcherOption1", function () {
		darwin.Mediator.prepareWatcherClick("https://api.github.com/repos"+$("#WatcherOption1").text()+"/subscribers?per_page=100&page=", $("#WatcherOption1").text());	
		WatcherReset();

	});
	$(document).on("click.darwin","#WatcherOption2", function () {
		darwin.Mediator.prepareWatcherClick("https://api.github.com/repos"+$("#WatcherOption2").text()+"/subscribers?per_page=100&page=", $("#WatcherOption2").text());	
		WatcherReset();

	});
	$(document).on("click.darwin","#WatcherOption3", function () {		
		darwin.Mediator.prepareWatcherClick("https://api.github.com/repos"+$("#WatcherOption3").text()+"/subscribers?per_page=100&page=", $("#WatcherOption3").text());	
		WatcherReset();

	});
	$(document).on("click.darwin","#WatcherOption4", function () {
		darwin.Mediator.prepareWatcherClick("https://api.github.com/repos"+$("#WatcherOption4").text()+"/subscribers?per_page=100&page=", $("#WatcherOption4").text());	
		WatcherReset();

	});
	$(document).on("click.darwin","#WatcherOption5", function () {			
		darwin.Mediator.prepareWatcherClick("https://api.github.com/repos"+$("#WatcherOption5").text()+"/subscribersper_page=100&page=", $("#WatcherOption5").text());	
		sWatcherReset();

	});	
	$('#sampleRate1Watcher').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		drawWatcherGraph();

	});	
	$('#sampleRate2Watcher').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		drawWatcherGraph();

	});	
	$('#sampleRate3Watcher').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		drawWatcherGraph();

	});	
	$('#sampleRate4Watcher').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
		drawWatcherGraph();

	});	
	
	$('#chartType1Watcher').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		drawWatcherGraph();
	});
	$('#chartType2Watcher').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		drawWatcherGraph();
	});
	$('#chartType3Watcher').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		drawWatcherGraph();

	});
	
	function drawWatcherGraph(){
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getWatcherDetails(), "weeks", "week On week Watchers", darwin.projectManagerModule.getSampleIndex(), "watcher", darwin.Mediator.getChartType());
	}

	function WatcherReset(){
		darwin.progressbarModule.reset();
	}
});