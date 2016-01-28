var darwin = darwin || {};

$(document).ready(function(e) {	

	$(document).on("click.darwin","#MeanChoice1", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","additions");
	});
	$(document).on("click.darwin","#MeanChoice2", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","deletions");
	});
	$(document).on("click.darwin","#MeanChoice3", function () {	
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","LOC");
	});
	$(document).on("click.darwin","#MeanChoice4", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","commits");
	});
	$(document).on("click.darwin","#MeanChoice5", function () {	
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","stars");
	});		
	$(document).on("click.darwin","#MeanChoice6", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","tags");
	});
	$(document).on("click.darwin","#MeanChoice7", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","forks");
	});
	$(document).on("click.darwin","#MeanChoice8", function () {		
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions","issues");
	});
	$(document).on("click.darwin","#MeanChoice9", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupStatUi("mean","#meanOptions", "watchers");
	});
	
	$('#submitButtonMean').on("click.darwin", function(e){
		darwin.Mediator.getCheckedMeanData(darwin.projectManagerModule.getMeanType());
	});	
	
});