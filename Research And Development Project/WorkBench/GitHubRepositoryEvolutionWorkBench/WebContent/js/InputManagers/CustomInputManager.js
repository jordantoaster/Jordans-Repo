/**
 * handles input on the custom tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#0", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(0);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#1", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(1);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#2", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(2);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#3", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(3);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#4", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(4);
		darwin.Mediator.setupCustomComponentsOptions();
	});	
	$(document).on("click.darwin","#additions", function (e) {			
		e.preventDefault();	
		
		if(darwin.customTabModule.getIsAdditionsChecked()){
			darwin.customTabModule.setAdditionsChecked(false);
		} else {
			darwin.customTabModule.setAdditionsChecked(true);
		}
			
	});	
	$(document).on("click.darwin","#deletions", function (e) {			
		e.preventDefault();	
		
		if(darwin.customTabModule.getIsDeletionsChecked()){
			darwin.customTabModule.setDeletionsChecked(false);
		} else {
			darwin.customTabModule.setDeletionsChecked(true);
		}
	});	
	$(document).on("click.darwin","#LOC", function (e) {			
		e.preventDefault();	
		
		if(darwin.customTabModule.getIsLOCChecked()){
			darwin.customTabModule.setLOCChecked(false);
		} else {
			darwin.customTabModule.setLOCChecked(true);
		}
	});	
	$(document).on("click.darwin","#commits", function (e) {			
		e.preventDefault();	
		
		if(darwin.customTabModule.getIsCommitsChecked()){
			darwin.customTabModule.setCommitsChecked(false);
		} else {
			darwin.customTabModule.setCommitsChecked(true);
		}
	});	
	
	$('#submitButtonCustom').on("click.darwin", function(e){

		//render auto stats first
		
		//render manual stats
	});	
	
});