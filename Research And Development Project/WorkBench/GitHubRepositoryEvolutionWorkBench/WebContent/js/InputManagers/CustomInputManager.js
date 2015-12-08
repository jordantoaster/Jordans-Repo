/**
 * handles input on the custom tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#0", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(0);
		setupNewProject();
	});	
	$(document).on("click.darwin","#1", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(1);
		setupNewProject();
	});	
	$(document).on("click.darwin","#2", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(2);
		setupNewProject()
	});	
	$(document).on("click.darwin","#3", function (e) {			
		e.preventDefault();
		darwin.customTabModule.setCurrentIndex(3);
		setupNewProject();
	});	
	$(document).on("click.darwin","#4", function (e) {			
		e.preventDefault();	
		darwin.customTabModule.setCurrentIndex(4);
		setupNewProject()
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
	$(document).on("click.darwin","#starsCheck", function (e) {	
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsStarsChecked()){
			darwin.customTabModule.setStarsChecked(false);
		} else {
			darwin.customTabModule.setStarsChecked(true);
		}
		
		if(darwin.customTabModule.getIsStarsChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getStarsIndex(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	$(document).on("click.darwin","#forksCheck", function (e) {	
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsForksChecked()){
			darwin.customTabModule.setForksChecked(false);
		} else {
			darwin.customTabModule.setForksChecked(true);
		}
		
		if(darwin.customTabModule.getIsForksChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getForksIndex(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	$(document).on("click.darwin","#tagsCheck", function (e) {	
		
		//allows resamping to take place until a new check is clicked
		if(darwin.Mediator.getCurrentCustomSearch()){
    		darwin.Mediator.setCurrentCustomSearch(false);
    		darwin.Mediator.resetCustomList();
		}
		
		if(darwin.customTabModule.getIsTagsChecked()){
			darwin.customTabModule.setTagsChecked(false);
		} else {
			darwin.customTabModule.setTagsChecked(true);
		}
		
		if(darwin.customTabModule.getIsTagsChecked()){
			darwin.Mediator.addToCustomList(darwin.dataManager.getTagsIndex(darwin.customTabModule.getCurrentIndex()), darwin.projectManagerModule.getProjectNamesIndex(darwin.customTabModule.getCurrentIndex()));
		}
	});	
	
	$('#sampleRate1Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(0);	

	    redrawCustomGraph();

	});	
	$('#sampleRate2Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(1);	
	    
	    redrawCustomGraph();

	});	
	$('#sampleRate3Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(2);	
	    
	    redrawCustomGraph();

	});	
	$('#sampleRate4Custom').on("click.darwin", function(e){
		e.preventDefault();

	    darwin.projectManagerModule.setSampleIndex(3);	
	    
	    redrawCustomGraph();
	});	
	
	$('#chartType1Custom').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("LineChart");
		redrawCustomGraph();
	});
	$('#chartType2Custom').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("SteppedAreaChart");
		redrawCustomGraph();
	});
	$('#chartType3Custom').on("click.darwin", function(e){
		e.preventDefault();

		darwin.Mediator.setChartType("ScatterChart");
		redrawCustomGraph();

	});
	
	$('#submitButtonCustom').on("click.darwin", function(e){
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType());
	});	
	
	function redrawCustomGraph(){
		darwin.Mediator.drawCustomGraph(darwin.dataManager.getCustomList(), "","", darwin.projectManagerModule.getSampleIndex(), darwin.Mediator.getChartType());
	}
	
	function setupNewProject(){
		darwin.Mediator.clearOptionsOnly();
    	$("#customChart").empty();
		darwin.Mediator.setupCustomComponentsOptions();
	}
	
});