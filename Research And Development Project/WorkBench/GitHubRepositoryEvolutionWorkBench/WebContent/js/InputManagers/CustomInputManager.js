/**
 * handles input on the custom tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#0", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
		darwin.customTabModule.setCurrentIndex(0);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#1", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
		darwin.customTabModule.setCurrentIndex(1);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#2", function (e) {			
		e.preventDefault();	
		darwin.Mediator.clearOptionsOnly();
		darwin.customTabModule.setCurrentIndex(2);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#3", function (e) {			
		e.preventDefault();
		darwin.Mediator.clearOptionsOnly();
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
		
		if(darwin.customTabModule.getIsCommitsChecked()){
			darwin.customTabModule.setCommitsChecked(false);
		} else {
			darwin.customTabModule.setCommitsChecked(true);
		}
		
		if(darwin.customTabModule.getIsCommitsChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getCommits(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	
	$('#submitButtonCustom').on("click.darwin", function(e){
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","");
	});	
	
});