/**
 * handles input on the custom tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#0", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
    	$("#customChart").empty();
		darwin.customTabModule.setCurrentIndex(0);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#1", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
    	$("#customChart").empty();
		darwin.customTabModule.setCurrentIndex(1);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#2", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
    	$("#customChart").empty();
		darwin.customTabModule.setCurrentIndex(2);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#3", function (e) {			
		e.preventDefault();
		darwin.Mediator.clearOptionsOnly();
    	$("#customChart").empty();
		darwin.customTabModule.setCurrentIndex(3);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#4", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
		darwin.customTabModule.setCurrentIndex(4);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#additionsCheck", function (e) {		
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsAdditionsChecked()){
			darwin.customTabModule.setAdditionsChecked(false);
		} else {
			darwin.customTabModule.setAdditionsChecked(true);
		}
		
		if(darwin.customTabModule.getIsAdditionsChecked()){
			//pass additions and project name to customlist
			darwin.Mediator.addToCustomList(darwin.dataManager.getAdditions(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
			
	});	
	$(document).on("click.darwin","#deletionsCheck", function (e) {		
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsDeletionsChecked()){
			darwin.customTabModule.setDeletionsChecked(false);
		} else {
			darwin.customTabModule.setDeletionsChecked(true);
		}
		
		if(darwin.customTabModule.getIsDeletionsChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getDeletions(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	$(document).on("click.darwin","#LOCCheck", function (e) {		
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsLOCChecked()){
			darwin.customTabModule.setLOCChecked(false);
		} else {
			darwin.customTabModule.setLOCChecked(true);
		}
		
		if(darwin.customTabModule.getIsLOCChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getLOCOverTime(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	$(document).on("click.darwin","#commitsCheck", function (e) {	
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsCommitsChecked()){
			darwin.customTabModule.setCommitsChecked(false);
		} else {
			darwin.customTabModule.setCommitsChecked(true);
		}
		
		if(darwin.customTabModule.getIsCommitsChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getCommitsIndex(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	
	$('#sampleRate1Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex());

	});	
	$('#sampleRate2Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex());

	});	
	$('#sampleRate3Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex());

	});	
	$('#sampleRate4Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
	    //add a redraw here
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex());

	});	
	
	$('#submitButtonCustom').on("click.darwin", function(e){
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex());
	});	
	
});