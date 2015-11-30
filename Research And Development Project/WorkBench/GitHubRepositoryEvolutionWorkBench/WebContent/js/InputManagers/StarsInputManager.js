/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#starOption1", function () {
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption1").text()+"/stargazers?per_page=100&page=");	

	});
	$(document).on("click.darwin","#starOption2", function () {
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption2").text()+"/stargazers?per_page=100&page=");	
	
	});
	$(document).on("click.darwin","#starOption3", function () {		
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption3").text()+"/stargazers?per_page=100&page=");	
	});
	$(document).on("click.darwin","#starOption4", function () {
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption4").text()+"/stargazers?per_page=100&page=");	

	});
	$(document).on("click.darwin","#starption5", function () {			
		darwin.Mediator.prepareStarClick("https://api.github.com/repos"+$("#starOption5").text()+"/stargazersper_page=100&page=");	
	});	
	$('#sampleRate1Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "star");

	});	
	$('#sampleRate2Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "star");

	});	
	$('#sampleRate3Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "star");


	});	
	$('#sampleRate4Stars').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
		darwin.Mediator.drawGenericGraph(darwin.Mediator.getStarDetails(), "weeks", "week On week Commits", darwin.projectManagerModule.getSampleIndex(), "star");

	});	
});