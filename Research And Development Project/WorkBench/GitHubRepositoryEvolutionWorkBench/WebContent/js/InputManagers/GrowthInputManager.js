var darwin = darwin || {};

$(document).ready(function(e) {	

	$(document).on("click.darwin","#growthChoice1", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","additions");
	});
	$(document).on("click.darwin","#growthChoice2", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","deletions");
	});
	$(document).on("click.darwin","#growthChoice3", function () {	
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","LOC");
	});
	$(document).on("click.darwin","#growthChoice4", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","commits");
	});
	$(document).on("click.darwin","#growthChoice5", function () {	
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","stars");
	});		
	$(document).on("click.darwin","#growthChoice6", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","tags");
	});
	$(document).on("click.darwin","#growthChoice7", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","forks");
	});
	$(document).on("click.darwin","#growthChoice8", function () {		
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","issues");
	});
	$(document).on("click.darwin","#growthChoice9", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions", "watchers");
	});
	
	$('#submitButtonGrowth').on("click.darwin", function(e){
		darwin.Mediator.getCheckedGrowthData(darwin.projectManagerModule.getGrowthType());
	});	
	
});