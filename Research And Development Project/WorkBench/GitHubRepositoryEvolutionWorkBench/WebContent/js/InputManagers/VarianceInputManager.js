var darwin = darwin || {};

$(document).ready(function(e) {	

	$(document).on("click.darwin","#varianceChoice1", function () {
		darwin.projectManagerModule.resetVarianceOptions();//

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","additions");
	});
	$(document).on("click.darwin","#varianceChoice2", function () {
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","deletions");
	});
	$(document).on("click.darwin","#varianceChoice3", function () {	
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","LOC");
	});
	$(document).on("click.darwin","#varianceChoice4", function () {
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","commits");
	});
	$(document).on("click.darwin","#varianceChoice5", function () {	
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","stars");
	});		
	$(document).on("click.darwin","#varianceChoice6", function () {
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","tags");
	});
	$(document).on("click.darwin","#varianceChoice7", function () {
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","forks");
	});
	$(document).on("click.darwin","#varianceChoice8", function () {		
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions","issues");
	});
	$(document).on("click.darwin","#varianceChoice9", function () {
		darwin.projectManagerModule.resetVarianceOptions();

		darwin.projectManagerModule.setupStatUi("variance","#varianceOptions", "watchers");
	});
	
	$('#submitButtonVariance').on("click.darwin", function(e){
		darwin.Mediator.getCheckedVarianceData(darwin.projectManagerModule.getNormalityType());
	});	
	
});