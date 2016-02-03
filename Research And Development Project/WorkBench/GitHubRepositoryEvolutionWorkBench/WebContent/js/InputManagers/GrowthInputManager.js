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

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","commitsAcc");
	});
	$(document).on("click.darwin","#growthChoice5", function () {	
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","starsAcc");
	});		
	$(document).on("click.darwin","#growthChoice6", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","tagsAcc");
	});
	$(document).on("click.darwin","#growthChoice7", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","forksAcc");
	});
	$(document).on("click.darwin","#growthChoice8", function () {		
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions","issuesAcc");
	});
	$(document).on("click.darwin","#growthChoice9", function () {
		darwin.projectManagerModule.resetGrowthOptions();

		darwin.projectManagerModule.setupStatUi("growth","#growthOptions", "watchersAcc");
	});
	
	$('#submitButtonGrowth').on("click.darwin", function(e){
		darwin.Mediator.getCheckedGrowthData(darwin.projectManagerModule.getGrowthType());
	});	
	
});