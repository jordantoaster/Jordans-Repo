/**
 * @author Jordan McDonald
 *
 * Description - Handles the various potential inputs for this particular facet of functionality + the options provided on the ui
 * 				 all program flow is directed to the mediator for coordination
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#submitButtonUser", function () {
		darwin.Mediator.prepareUserClick($("#userFeild").val());	
	});
});