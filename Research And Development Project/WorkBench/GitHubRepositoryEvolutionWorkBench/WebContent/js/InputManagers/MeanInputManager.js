var darwin = darwin || {};

$(document).ready(function(e) {	

	$(document).on("click.darwin","#MeanChoice1", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("additions");
	});
	$(document).on("click.darwin","#MeanChoice2", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("deletions");
	});
	$(document).on("click.darwin","#MeanChoice3", function () {	
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("LOC");
	});
	$(document).on("click.darwin","#MeanChoice4", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("commits");
	});
	$(document).on("click.darwin","#MeanChoice5", function () {	
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("stars");
	});		
	$(document).on("click.darwin","#MeanChoice6", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("tags");
	});
	$(document).on("click.darwin","#MeanChoice7", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("forks");
	});
	$(document).on("click.darwin","#MeanChoice8", function () {		
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("issues");
	});
	$(document).on("click.darwin","#MeanChoice9", function () {
		darwin.projectManagerModule.resetMeanOptions();

		darwin.projectManagerModule.setupMeanUi("watchers");
	});
	
});