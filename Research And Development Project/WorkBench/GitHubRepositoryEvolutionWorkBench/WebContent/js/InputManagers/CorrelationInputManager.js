/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {	

	$(document).on("click.darwin","#CorrelationChoice1S1", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "additions");
	});
	$(document).on("click.darwin","#CorrelationChoice2S1", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "deletions");
	});
	$(document).on("click.darwin","#CorrelationChoice3S1", function () {	
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "LOC");
	});
	$(document).on("click.darwin","#CorrelationChoice4S1", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "commits");
	});
	$(document).on("click.darwin","#CorrelationChoice5S1", function () {	
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "stars");
	});		
	$(document).on("click.darwin","#CorrelationChoice6S1", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "tags");
	});
	$(document).on("click.darwin","#CorrelationChoice7S1", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "forks");
	});
	$(document).on("click.darwin","#CorrelationChoice8S1", function () {		
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "issues");
	});
	$(document).on("click.darwin","#CorrelationChoice9S1", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS1();

		darwin.projectManagerModule.setupStatUi("CorrelationS1", "#correlationOptions1", "watchers");
	});
	
	$(document).on("click.darwin","#CorrelationChoice1S2", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2", "additions");
	});
	$(document).on("click.darwin","#CorrelationChoice2S2", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","deletions");
	});
	$(document).on("click.darwin","#CorrelationChoice3S2", function () {	
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","LOC");
	});
	$(document).on("click.darwin","#CorrelationChoice4S2", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","commits");
	});
	$(document).on("click.darwin","#CorrelationChoice5S2", function () {	
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","stars");
	});		
	$(document).on("click.darwin","#CorrelationChoice6S2", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","tags");
	});
	$(document).on("click.darwin","#CorrelationChoice7S2", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","forks");
	});
	$(document).on("click.darwin","#CorrelationChoice8S2", function () {		
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","issues");
	});
	$(document).on("click.darwin","#CorrelationChoice9S2", function () {
		darwin.projectManagerModule.resetCorrelationOptionsS2();

		darwin.projectManagerModule.setupStatUi("CorrelationS2", "#correlationOptions2","watchers");
	});
	
	
	$('#submitButtonCorrelation').on("click.darwin", function(e){
		darwin.Mediator.getCheckedCorrelationsData(darwin.projectManagerModule.getCorrelationTypeS1(),darwin.projectManagerModule.getCorrelationTypeS2());
	});	
	
});