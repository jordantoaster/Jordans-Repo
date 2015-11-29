/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#commitOption1", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption1").text()+"/commits?per_page=100&page=");	

	});
	$(document).on("click.darwin","#commitOption2", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption2").text()+"/commits?per_page=100&page=");	
	
	});
	$(document).on("click.darwin","#commitOption3", function () {		
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption3").text()+"/commits?per_page=100&page=");	
	});
	$(document).on("click.darwin","#commitOption4", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption4").text()+"/commits?per_page=100&page=");	

	});
	$(document).on("click.darwin","#commitOption5", function () {			
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption5").text()+"/commits?per_page=100&page=");	
	});	
	$('#sampleRate1Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
	    darwin.projectManagerModule.setSampleIndex(0);	

		darwin.Mediator.drawCommitGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "commit");

	});	
	$('#sampleRate2Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		darwin.Mediator.drawCommitGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "commit");

	});	
	$('#sampleRate3Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		darwin.Mediator.drawCommitGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "commit");

	});	
	$('#sampleRate4Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
	    darwin.projectManagerModule.setSampleIndex(3);	
	    
	    //add a redraw here
		darwin.Mediator.drawCommitGraph(darwin.Mediator.getCommitDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "commit");

	});	
});