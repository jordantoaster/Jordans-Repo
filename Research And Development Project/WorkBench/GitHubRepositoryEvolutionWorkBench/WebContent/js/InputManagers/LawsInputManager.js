/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	

	//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawOneBlock"){
			
			$("#blockOneTable tbody tr").remove(); 

			darwin.Mediator.makeServerRequestGeneric("laws", "one", darwin.Mediator.handleLawOneData,"POST","","", "");
		}// activated tab
	})
	
		//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawTwoBlock"){
			
			darwin.Mediator.makeServerRequestGeneric("laws", "two", darwin.Mediator.handleLawTwoData,"POST","","", "");
		}// activated tab
	})
	
		//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawThreeBlock"){
			
			$("#blockThreeTable tbody tr").remove(); 

			darwin.Mediator.makeServerRequestGeneric("laws", "three", darwin.Mediator.handleLawThreeData,"POST","","", "");
		}// activated tab
	})
	
		//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawFourBlock"){
			
			darwin.Mediator.makeServerRequestGeneric("laws", "four", darwin.Mediator.handleLawFourData,"POST","","", "");
		}// activated tab
	})
	
		//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawFiveBlock"){
			
			$("#blockFiveTable tbody tr").remove(); 

			darwin.Mediator.makeServerRequestGeneric("laws", "five", darwin.Mediator.handleLawFiveData,"POST","","", "");
		}// activated tab
	})
	
		//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawSixBlock"){
			
			$("#blockSixTable tbody tr").remove(); 

			darwin.Mediator.makeServerRequestGeneric("laws", "six", darwin.Mediator.handleLawSixData,"POST","","", "");
		}// activated tab
	})
	
		//Used to auto run the laws code
	$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		if($(this).attr('href') == "#lawSevenBlock"){
			
			$("#blockSevenTable tbody tr").remove(); 

			darwin.Mediator.makeServerRequestGeneric("laws", "seven", darwin.Mediator.handleLawSevenData,"POST","","", "");
		}// activated tab
	})
});