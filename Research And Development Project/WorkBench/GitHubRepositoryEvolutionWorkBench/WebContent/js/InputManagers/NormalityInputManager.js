/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {	

	$(document).on("click.darwin","#normalityChoice1", function () {
		darwin.projectManagerModule.resetNormalityOptions();//

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","additions");
	});
	$(document).on("click.darwin","#normalityChoice2", function () {
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","deletions");
	});
	$(document).on("click.darwin","#normalityChoice3", function () {	
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","LOC");
	});
	$(document).on("click.darwin","#normalityChoice4", function () {
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","commits");
	});
	$(document).on("click.darwin","#normalityChoice5", function () {	
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("mean","#normalityOptions","stars");
	});		
	$(document).on("click.darwin","#normalityChoice6", function () {
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","tags");
	});
	$(document).on("click.darwin","#normalityChoice7", function () {
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","forks");
	});
	$(document).on("click.darwin","#normalityChoice8", function () {		
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions","issues");
	});
	$(document).on("click.darwin","#normalityChoice9", function () {
		darwin.projectManagerModule.resetNormalityOptions();

		darwin.projectManagerModule.setupStatUi("normality","#normalityOptions", "watchers");
	});
	
	$('#submitButtonNormality').on("click.darwin", function(e){
		darwin.Mediator.getCheckedNormalityData(darwin.projectManagerModule.getNormalityType());
	});	
	
});